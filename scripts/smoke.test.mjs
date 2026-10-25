import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve, join, extname } from "path";
import { execSync } from "child_process";
import { getGithubActivity } from "../src/lib/github.ts";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src");
const DIST = resolve(ROOT, "dist");

function read(...segments) {
  return readFileSync(resolve(SRC, ...segments), "utf-8");
}

function assert(condition, message) {
  if (!condition) {
    console.error("❌ FAIL:", message);
    process.exit(1);
  }
  console.log("✅ PASS:", message);
}

let passed = 0;
let failed = 0;

function check(condition, message) {
  if (condition) {
    passed++;
    console.log("✅", message);
  } else {
    failed++;
    console.error("❌", message);
  }
}

console.log("Running smoke tests...\n");

// 1. Service detail page is indexable
const slugPage = read("pages", "servicios", "[slug].astro");
check(
  !slugPage.includes("noindex") && !slugPage.includes("nofollow") && slugPage.includes("<BaseHead"),
  "Service detail page is indexable (no noindex meta tag)"
);

// 2. WhatsApp runtime code has no hardcoded fake number fallback
const contactData = read("data", "contact.ts");
const whatsAppBtn = read("components", "WhatsAppButton.astro");
// Ensure WHATSAPP_NUMBER falls back to empty string, not a fake number
const fakeNumberPatterns = [
  /\|\|\s*["']\d{10,}["']/,          // || "1234567890"
  /\|\|\s*["']\+?\d{10,}["']/,       // || "+573123456789"
  /\|\|\s*["']3\d{9,}["']/,          // || "3123456789"
  /default:\s*["']\d{10,}["']/,      // default: "1234567890"
];
const hasFakeFallback = fakeNumberPatterns.some((re) =>
  re.test(contactData)
);
check(
  !hasFakeFallback && contactData.includes('|| ""'),
  "WhatsApp number has no hardcoded fake fallback"
);
// Also ensure the button component uses the env-driven constant, not a literal
check(
  !/wa\.me\/\d/.test(whatsAppBtn) && whatsAppBtn.includes("WHATSAPP_NUMBER"),
  "WhatsAppButton uses WHATSAPP_NUMBER constant"
);

// 3. Testimonials component renders empty/pending state instead of fictional reviews
const trustData = read("data", "trust.ts");
const testimonials = read("components", "Testimonials.astro");
const testimonialsArrayMatch = trustData.match(
  /TESTIMONIALS:\s*Testimonial\[\]\s*=\s*(\[[\s\S]*?\]);/
);
let testimonialsArrayIsEmpty = false;
if (testimonialsArrayMatch) {
  const arrayContent = testimonialsArrayMatch[1]
    .replace(/\/\/.*$/gm, "")
    .replace(/\s+/g, "")
    .trim();
  testimonialsArrayIsEmpty = arrayContent === "[]";
}
check(
  testimonialsArrayIsEmpty,
  "TESTIMONIALS array is empty (no fictional reviews)"
);
check(
  testimonials.includes("testimonial-empty") && testimonials.includes("Próximamente"),
  "Testimonials component renders empty/pending state"
);

// 4. Typo "me interita" is gone
const allSrcFiles = [
  read("data", "contact.ts"),
  read("data", "hero.ts"),
  read("pages", "servicios", "[slug].astro"),
];
const hasTypo = allSrcFiles.some((f) => f.includes("interita"));
check(!hasTypo, "Typo 'interita' is not present in source files");

// 5. Technical SEO: public/robots.txt exists and declares sitemap & user-agent
const robotsPath = resolve(import.meta.dirname, "../public/robots.txt");
const robotsExists = existsSync(robotsPath);
let robotsContent = "";
if (robotsExists) {
  robotsContent = readFileSync(robotsPath, "utf-8");
}
check(
  robotsExists &&
    robotsContent.includes("User-agent: *") &&
    robotsContent.includes("Sitemap: https://angelcorzo.dev/sitemap-index.xml"),
  "public/robots.txt exists and declares Sitemap and User-agent: *"
);

// 6. Technical SEO: BaseHead.astro contains robots meta tag with max-image-preview:large
const baseHead = read("components", "BaseHead.astro");
check(
  baseHead.includes('name="robots"') && baseHead.includes("max-image-preview:large"),
  "BaseHead.astro contains robots meta tag with max-image-preview:large"
);

// 7. Accessibility & i18n: StudyCasePost.astro has <html lang=\"es\"> and heroImage alt={title}
const studyCaseLayout = read("layouts", "StudyCasePost.astro");
check(
  studyCaseLayout.includes('<html lang="es">') &&
    studyCaseLayout.includes("alt={title}"),
  "StudyCasePost.astro has <html lang=\"es\"> and heroImage alt={title}"
);

// 8. SERP snippet quality: study case descriptions between 100 and 165 chars
const studyCaseDir = resolve(SRC, "content", "study-case");
const studyCaseFiles = existsSync(studyCaseDir)
  ? readdirSync(studyCaseDir).filter((f) => f.endsWith(".md"))
  : [];

let allDescriptionsValid = studyCaseFiles.length > 0;
const invalidCases = [];

for (const file of studyCaseFiles) {
  const content = readFileSync(resolve(studyCaseDir, file), "utf-8");
  const match = content.match(/^description:\s*(?:"([^"]*)"|'([^']*)'|([^\r\n]+))/m);
  const desc = match ? (match[1] ?? match[2] ?? match[3]).trim() : "";
  const len = desc.length;
  if (len < 100 || len > 165) {
    allDescriptionsValid = false;
    invalidCases.push(`${file} (${len} chars)`);
  }
}

check(
  allDescriptionsValid,
  `Study case descriptions are between 100 and 165 chars (SERP snippet quality)${
    invalidCases.length ? `: invalid [${invalidCases.join(", ")}]` : ""
  }`
);

// 9. Theme Architecture: global.css exports Noir/Latte tokens and BaseHead has zero-FOUC script
const globalCss = read("styles", "global.css");
const baseHeadContent = read("components", "BaseHead.astro");
const serviciosIndexContent = read("pages", "servicios", "index.astro");
check(
  globalCss.includes("--color-noir-crust: #000000") &&
    globalCss.includes('[data-theme="noir"]') &&
    globalCss.includes('[data-theme="latte"]') &&
    globalCss.includes("--color-text-secondary: var(--text-secondary);"),
  "global.css defines Catppuccin Noir and Latte tokens (including --color-text-secondary and #000000)"
);
check(
  baseHeadContent.includes("try {") &&
    baseHeadContent.includes("localStorage.getItem('theme') || 'noir'") &&
    baseHeadContent.includes("document.documentElement.setAttribute('data-theme', savedTheme)") &&
    baseHeadContent.includes("document.documentElement.setAttribute('data-theme', 'noir')") &&
    baseHeadContent.includes('<meta name="theme-color" content="#000000" />') &&
    serviciosIndexContent.includes('<meta name="theme-color" content="#000000" />'),
  "BaseHead.astro and servicios/index.astro contain hardened try-catch theme initialization and #000000 theme-color"
);

// 10. Header & Theme Toggle: ThemeToggle component exists with accessible button & Header embeds it with monogram logo
const themeToggleExists = existsSync(resolve(SRC, "components", "ThemeToggle.astro"));
let themeToggleContent = "";
if (themeToggleExists) {
  themeToggleContent = read("components", "ThemeToggle.astro");
}
check(
  themeToggleExists &&
    themeToggleContent.includes("<button") &&
    themeToggleContent.includes('aria-label="Cambiar tema"') &&
    themeToggleContent.includes("<svg") &&
    (themeToggleContent.includes("sun") || themeToggleContent.includes("Sun")) &&
    (themeToggleContent.includes("moon") || themeToggleContent.includes("Moon")) &&
    themeToggleContent.includes("try {") &&
    themeToggleContent.includes('localStorage.setItem("theme"'),
  "ThemeToggle.astro renders accessible button with sun/moon SVG icons and try-catch wrapped localStorage writes"
);

const headerContent = read("components", "Header.astro");
check(
  headerContent.includes("<ThemeToggle") &&
    headerContent.includes("monogram") &&
    (headerContent.includes("&gt;_") || headerContent.includes(">_")),
  "Header.astro embeds ThemeToggle and contains terminal monogram logo mark (>_ AC / angelcorzo)"
);
check(
  headerContent.includes("@media (max-width: 1024px)") &&
    headerContent.includes("white-space: nowrap;") &&
    headerContent.includes("flex-shrink: 0;") &&
    headerContent.includes("gap: 6px;"),
  "Header.astro implements responsive nowrap, flex-shrink, tightened gap (6px), and 1024px mobile breakpoint"
);

// 11. GitHub Activity: getGithubActivity() returns 52 weeks, totalContributions, streaks
const activity = await getGithubActivity();
check(
  activity &&
    Array.isArray(activity.weeks) &&
    activity.weeks.length === 52 &&
    activity.weeks.every((week) => Array.isArray(week) && week.length <= 7 && week.length > 0),
  "getGithubActivity returns 52 weeks of contribution data"
);

const sampleDay = activity?.weeks?.[0]?.[0];
check(
  sampleDay &&
    typeof sampleDay.date === "string" &&
    typeof sampleDay.count === "number" &&
    typeof sampleDay.level === "number" &&
    sampleDay.level >= 0 &&
    sampleDay.level <= 4,
  "Contribution days contain valid date, count, and level (0-4)"
);

check(
  typeof activity?.totalContributions === "number" && activity.totalContributions > 0,
  `getGithubActivity returns valid totalContributions (${activity?.totalContributions})`
);

check(
  typeof activity?.currentStreak === "number" && activity.currentStreak >= 0,
  `getGithubActivity returns valid currentStreak (${activity?.currentStreak})`
);

check(
  typeof activity?.longestStreak === "number" && activity.longestStreak >= (activity?.currentStreak ?? 0),
  `getGithubActivity returns valid longestStreak (${activity?.longestStreak})`
);

// 12. GithubActivity.astro component renders CLI terminal with activity header, streak stats, and intensity legend
const githubActivityPath = resolve(SRC, "components", "GithubActivity.astro");
const githubActivityExists = existsSync(githubActivityPath);
let githubActivityContent = "";
if (githubActivityExists) {
  githubActivityContent = read("components", "GithubActivity.astro");
}
check(
  githubActivityExists &&
    githubActivityContent.includes("ACTIVITY // JuniorCorzo") &&
    githubActivityContent.includes("in the last year") &&
    githubActivityContent.includes("day streak") &&
    githubActivityContent.includes("Less") &&
    githubActivityContent.includes("More") &&
    !githubActivityContent.includes('tabindex="0"') &&
    githubActivityContent.includes('role="img"'),
  "GithubActivity.astro exists, renders CLI terminal with header, streaks, legend, and WCAG-accessible role='img' (no tab trap)"
);

// 13. index.astro embeds GithubActivity component under #trust
const indexContent = read("pages", "index.astro");
check(
  indexContent.includes("<GithubActivity") && indexContent.includes("import GithubActivity"),
  "index.astro embeds GithubActivity component"
);

// 14. Baseline Copy & Headings Preservation Checksum
const heroData = read("data", "hero.ts");
const heroComponent = read("components", "Hero.astro");
const trustComponent = read("components", "TrustSignals.astro");
const servicesData = read("data", "services.ts");
const servicesTeaser = read("components", "ServicesTeaser.astro");
const projectsComponent = read("components", "Projects.astro");
const footerComponent = read("components", "Footer.astro");

// 14.1 Hero H1 headline and copy preservation
check(
  heroData.includes('HERO_HEADLINE_1 = "Tu proyecto, de la"') &&
    heroData.includes('HERO_HEADLINE_2 = "idea al deploy"') &&
    heroData.includes("Tecnólogo en Análisis y Desarrollo de Software") &&
    heroComponent.includes("HERO_HEADLINE_1") &&
    heroComponent.includes("HERO_HEADLINE_2") &&
    heroComponent.includes("Hola, soy {DEVELOPER_NAME}") &&
    heroComponent.includes("HERO_DESCRIPTION") &&
    heroComponent.includes("Hablemos por WhatsApp") &&
    heroComponent.includes('<Icon name="lucide:message-circle"') &&
    heroComponent.includes("Ver servicios →"),
  "Hero copy preserved: H1 headlines, subtitle, description, and primary/secondary CTAs"
);

// 14.2 Trust signals metrics & credentials preservation
check(
  trustData.includes('"3+"') &&
    trustData.includes('"Años de experiencia"') &&
    trustData.includes('"4+"') &&
    trustData.includes('"Proyectos públicos"') &&
    trustData.includes('"100%"') &&
    trustData.includes('"Compromiso con la calidad"') &&
    trustData.includes('"24h"') &&
    trustData.includes('"Tiempo de respuesta"') &&
    trustComponent.includes("metric.value") &&
    trustComponent.includes("metric.label"),
  "TrustSignals metrics copy preserved: exact metric values and labels match baseline"
);

// 14.3 Services H2 and service cards preservation
check(
  servicesTeaser.includes("ls servicios/") &&
    servicesTeaser.includes("// soluciones que ofrezco") &&
    servicesData.includes("Desarrollo Full Stack en Colombia") &&
    servicesData.includes("Desarrollo Backend y APIs en Colombia") &&
    servicesData.includes("Consultoría de Software y Arquitectura") &&
    servicesData.includes("Desarrollo de Agentes de IA en Colombia"),
  "ServicesTeaser copy preserved: H2 command heading, subtitle, and all 4 service titles"
);

// 14.4 Projects H2 and case study cards preservation
check(
  projectsComponent.includes("ls proyectos/destacados/") &&
    projectsComponent.includes("// casos de éxito recientes") &&
    projectsComponent.includes("GitHub") &&
    projectsComponent.includes("Caso de Estudio"),
  "Projects copy preserved: H2 command heading, subtitle, and project card CTAs"
);

// 14.5 Index CTA section copy preservation
check(
  indexContent.includes("¿listo para tu próximo proyecto?") &&
    indexContent.includes("Agendemos una llamada de 15 minutos para hablar sobre tu idea. Sin compromiso.") &&
    indexContent.includes("Hablemos por WhatsApp") &&
    indexContent.includes('<Icon name="lucide:message-circle"') &&
    indexContent.includes("Ver más opciones de contacto →"),
  "Index CTA section preserved: H2 heading, pitch paragraph, and WhatsApp/Secondary CTAs"
);

// 14.6 Footer navigation and copyright copy preservation
check(
  footerComponent.includes("Inicio") &&
    footerComponent.includes("Servicios") &&
    footerComponent.includes("Sobre mí") &&
    footerComponent.includes("Blog") &&
    footerComponent.includes("Contacto") &&
    footerComponent.includes("footer.json") &&
    footerComponent.includes("Hecho con café y código."),
  "Footer copy preserved: navigation links, footer.json buffer, and copyright notice"
);

// 15. Brand Assets: public/favicon.svg contains Noir monogram & public/images/og.png is valid PNG (> 10KB) referenced in BaseHead
const faviconPath = resolve(import.meta.dirname, "../public/favicon.svg");
const faviconExists = existsSync(faviconPath);
let faviconContent = "";
if (faviconExists) {
  faviconContent = readFileSync(faviconPath, "utf-8");
}
check(
  faviconExists &&
    faviconContent.includes("<svg") &&
    (faviconContent.includes(">_") || faviconContent.includes("&gt;_")) &&
    faviconContent.includes("AC") &&
    faviconContent.includes("#000000") &&
    faviconContent.includes("#cba6f7"),
  "public/favicon.svg exists and contains valid Catppuccin Noir monogram (>_ AC, #000000, #cba6f7)"
);

const ogPath = resolve(import.meta.dirname, "../public/images/og.png");
const ogExists = existsSync(ogPath);
let ogSize = 0;
let isPng = false;
if (ogExists) {
  const ogBuffer = readFileSync(ogPath);
  ogSize = ogBuffer.length;
  // PNG magic signature: 0x89 0x50 0x4E 0x47
  isPng =
    ogBuffer[0] === 0x89 &&
    ogBuffer[1] === 0x50 &&
    ogBuffer[2] === 0x4e &&
    ogBuffer[3] === 0x47;
}
check(
  ogExists && isPng && ogSize > 10 * 1024,
  `public/images/og.png exists, is valid PNG, and is > 10KB (actual: ${(ogSize / 1024).toFixed(1)}KB)`
);

check(
  baseHead.includes('href="/favicon.svg"') && baseHead.includes('/images/og.png'),
  "BaseHead.astro references /favicon.svg and /images/og.png"
);

// 16. WCAG 2.2 Contrast Ratio Compliance (Catppuccin Noir & Latte palettes)
function getRelativeLuminance(hex) {
  const rgb = hex.replace("#", "").match(/.{2}/g).map((x) => parseInt(x, 16) / 255);
  const [r, g, b] = rgb.map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Catppuccin Noir OLED checks
const noirCrust = "#000000";
const noirSurface0 = "#181826";
const noirText = "#e0e2ea";
const noirSubtext0 = "#a6adc8";
const noirMauve = "#cba6f7";
const noirSky = "#89dceb";
const noirGreen = "#a6e3a1";

const noirTextCrustRatio = getContrastRatio(noirText, noirCrust);
const noirTextSurfaceRatio = getContrastRatio(noirText, noirSurface0);
const noirSubtextCrustRatio = getContrastRatio(noirSubtext0, noirCrust);
const noirSubtextSurfaceRatio = getContrastRatio(noirSubtext0, noirSurface0);
const noirMauveCrustRatio = getContrastRatio(noirMauve, noirCrust);
const noirSkyCrustRatio = getContrastRatio(noirSky, noirCrust);
const noirGreenCrustRatio = getContrastRatio(noirGreen, noirCrust);

check(
  noirTextCrustRatio >= 7.0 && noirTextSurfaceRatio >= 7.0,
  `Catppuccin Noir text satisfies WCAG AAA (>= 7.0:1): ${noirTextCrustRatio.toFixed(2)}:1 on OLED crust, ${noirTextSurfaceRatio.toFixed(2)}:1 on surface0`
);

check(
  noirSubtextCrustRatio >= 4.5 && noirSubtextSurfaceRatio >= 4.5,
  `Catppuccin Noir subtext satisfies WCAG AA (>= 4.5:1): ${noirSubtextCrustRatio.toFixed(2)}:1 on OLED crust, ${noirSubtextSurfaceRatio.toFixed(2)}:1 on surface0`
);

check(
  noirMauveCrustRatio >= 4.5 && noirSkyCrustRatio >= 4.5 && noirGreenCrustRatio >= 4.5,
  `Catppuccin Noir accents satisfy WCAG AA on pitch black: Mauve ${noirMauveCrustRatio.toFixed(2)}:1, Sky ${noirSkyCrustRatio.toFixed(2)}:1, Green ${noirGreenCrustRatio.toFixed(2)}:1`
);

// Catppuccin Latte checks
const latteBase = "#eff1f5";
const latteText = "#4c4f69";
const latteMauve = "#8839ef";
const latteBlue = "#1e66f5";

const latteTextRatio = getContrastRatio(latteText, latteBase);
const latteMauveRatio = getContrastRatio(latteMauve, latteBase);
const latteBlueRatio = getContrastRatio(latteBlue, latteBase);

check(
  latteTextRatio >= 7.0,
  `Catppuccin Latte text satisfies WCAG AAA (>= 7.0:1): ${latteTextRatio.toFixed(2)}:1 on base (#eff1f5)`
);

check(
  latteMauveRatio >= 4.5 && latteBlueRatio >= 3.0,
  `Catppuccin Latte accents satisfy WCAG AA: Mauve ${latteMauveRatio.toFixed(2)}:1 (>= 4.5:1), Blue ${latteBlueRatio.toFixed(2)}:1 (>= 3.0:1)`
);

// 17. Build Artifacts & Sitemap Integrity
if (!existsSync(resolve(DIST, "index.html"))) {
  console.log("dist/ not found, building for comprehensive verification...");
  execSync("npx astro build", { stdio: "inherit", cwd: ROOT });
}

const sitemapPath = resolve(DIST, "sitemap-0.xml");
const sitemapExists = existsSync(sitemapPath);
let sitemapUrls = [];
if (sitemapExists) {
  const sitemapXml = readFileSync(sitemapPath, "utf-8");
  const locMatches = [...sitemapXml.matchAll(/<loc>(https:\/\/angelcorzo\.dev([^<]*))<\/loc>/g)];
  sitemapUrls = locMatches.map((m) => m[2]);
}

const EXPECTED_ROUTES = [
  "/",
  "/blog/",
  "/blog/arquitectura-mvp/",
  "/blog/spring-boot-seguridad/",
  "/contacto/",
  "/servicios/",
  "/servicios/agentes-ia/",
  "/servicios/consultorias/",
  "/servicios/desarrollo-backend/",
  "/servicios/desarrollo-full-stack/",
  "/sobre-mi/",
  "/study-case/dayen/",
  "/study-case/factus-dependency/",
  "/study-case/instruments-manage/",
  "/study-case/urban-style/",
];

const allExpectedRoutesInSitemap =
  sitemapExists &&
  sitemapUrls.length === EXPECTED_ROUTES.length &&
  EXPECTED_ROUTES.every((r) => sitemapUrls.includes(r));

check(
  allExpectedRoutesInSitemap,
  `sitemap-0.xml contains all ${EXPECTED_ROUTES.length} canonical routes without regression`
);

let allHtmlFilesExist = true;
const missingHtmlFiles = [];
for (const route of EXPECTED_ROUTES) {
  const htmlPath = resolve(DIST, route === "/" ? "index.html" : join(route.replace(/^\//, ""), "index.html"));
  if (!existsSync(htmlPath)) {
    allHtmlFilesExist = false;
    missingHtmlFiles.push(route);
  }
}

check(
  allHtmlFilesExist,
  `All ${EXPECTED_ROUTES.length} routes have prerendered index.html in dist/${
    missingHtmlFiles.length ? `: missing [${missingHtmlFiles.join(", ")}]` : ""
  }`
);

// 18. Structured Data (Schema.org / JSON-LD) Integrity
let allSchemasValid = true;
const invalidSchemaRoutes = [];

for (const route of EXPECTED_ROUTES) {
  const htmlPath = resolve(DIST, route === "/" ? "index.html" : join(route.replace(/^\//, ""), "index.html"));
  if (!existsSync(htmlPath)) continue;

  const html = readFileSync(htmlPath, "utf-8");
  const scriptMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let parsedScripts = [];
  try {
    parsedScripts = scriptMatches.map((m) => JSON.parse(m[1]));
  } catch (err) {
    allSchemasValid = false;
    invalidSchemaRoutes.push(`${route} (JSON parse error: ${err.message})`);
    continue;
  }

  // Base graph check: Person and WebSite
  const baseSchema = parsedScripts.find((s) => Array.isArray(s["@graph"]));
  if (!baseSchema) {
    allSchemasValid = false;
    invalidSchemaRoutes.push(`${route} (missing @graph base schema)`);
    continue;
  }

  const hasPerson = baseSchema["@graph"].some(
    (n) => n["@type"] === "Person" && n.url === "https://angelcorzo.dev" && n.name === "Angel Corzo"
  );
  const hasWebSite = baseSchema["@graph"].some(
    (n) => n["@type"] === "WebSite" && n.url === "https://angelcorzo.dev"
  );

  if (!hasPerson || !hasWebSite) {
    allSchemasValid = false;
    invalidSchemaRoutes.push(`${route} (incomplete Person/WebSite in @graph)`);
    continue;
  }

  // Route-specific schemas
  if (route === "/") {
    const faq = parsedScripts.find((s) => s["@type"] === "FAQPage");
    if (!faq || !Array.isArray(faq.mainEntity) || faq.mainEntity.length === 0) {
      allSchemasValid = false;
      invalidSchemaRoutes.push(`${route} (missing or empty FAQPage schema)`);
    }
  } else if (route.startsWith("/servicios/") && route !== "/servicios/") {
    const service = parsedScripts.find((s) => s["@type"] === "Service");
    if (!service || !service.name || !service.provider) {
      allSchemasValid = false;
      invalidSchemaRoutes.push(`${route} (missing or invalid Service schema)`);
    }
  } else if (route.startsWith("/study-case/")) {
    const techArticle = parsedScripts.find((s) => s["@type"] === "TechArticle");
    if (!techArticle || !techArticle.headline || !techArticle.author) {
      allSchemasValid = false;
      invalidSchemaRoutes.push(`${route} (missing or invalid TechArticle schema)`);
    }
  }
}

check(
  allSchemasValid,
  `All routes have valid Schema.org JSON-LD (Person/WebSite base, FAQPage, Service, and TechArticle)${
    invalidSchemaRoutes.length ? `: invalid [${invalidSchemaRoutes.join(", ")}]` : ""
  }`
);

// 19. SEO Guardrails on Prerendered HTML Pages
let seoGuardrailsPassed = true;
const seoFailures = [];

for (const route of EXPECTED_ROUTES) {
  const htmlPath = resolve(DIST, route === "/" ? "index.html" : join(route.replace(/^\//, ""), "index.html"));
  if (!existsSync(htmlPath)) continue;

  const html = readFileSync(htmlPath, "utf-8");
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  const canonicalMatch =
    html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) ||
    html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  const ogTitle = html.includes('property="og:title"');
  const ogDesc = html.includes('property="og:description"');
  const ogImg = html.includes('property="og:image"');
  const noindex = html.includes("noindex");

  const expectedCanonical = `https://angelcorzo.dev${route}`;
  if (!titleMatch || !titleMatch[1].trim()) {
    seoGuardrailsPassed = false;
    seoFailures.push(`${route} (missing <title>)`);
  }
  if (!descMatch || descMatch[1].length < 50 || descMatch[1].length > 200) {
    seoGuardrailsPassed = false;
    seoFailures.push(`${route} (description length ${descMatch ? descMatch[1].length : 0})`);
  }
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    seoGuardrailsPassed = false;
    seoFailures.push(`${route} (canonical mismatch: ${canonicalMatch ? canonicalMatch[1] : "none"} vs ${expectedCanonical})`);
  }
  if (!ogTitle || !ogDesc || !ogImg) {
    seoGuardrailsPassed = false;
    seoFailures.push(`${route} (missing OG tags)`);
  }
  if (noindex) {
    seoGuardrailsPassed = false;
    seoFailures.push(`${route} (unexpected noindex found)`);
  }
}

check(
  seoGuardrailsPassed,
  `Prerendered HTML pages pass SEO guardrails (title, valid description, exact canonical, OG meta, zero noindex)${
    seoFailures.length ? `: failures [${seoFailures.join(", ")}]` : ""
  }`
);

// 20. WCAG Accessibility on Build Outputs: Image Alt Attributes & Internal Link Integrity
function getHtmlFiles(dir) {
  let files = [];
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory() && item.name !== "_worker.js") {
      files.push(...getHtmlFiles(full));
    } else if (item.isFile() && item.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles(DIST);
let allImagesHaveAlt = true;
const imagesMissingAlt = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf-8");
  const imgTags = html.match(/<img[^>]+>/g) || [];
  for (const img of imgTags) {
    if (!/alt=["']/.test(img)) {
      allImagesHaveAlt = false;
      imagesMissingAlt.push(`${file}: ${img}`);
    }
  }
}

check(
  allImagesHaveAlt,
  `All <img> tags in prerendered HTML output contain alt attributes (WCAG 1.1)${
    imagesMissingAlt.length ? `: missing [${imagesMissingAlt.join(", ")}]` : ""
  }`
);

let internalLinksValid = true;
const brokenLinks = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf-8");
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#")) {
      const cleanHref = href.split("#")[0].split("?")[0];
      let targetPath = join(DIST, cleanHref);
      if (cleanHref.endsWith("/") || !extname(cleanHref)) {
        targetPath = join(targetPath, "index.html");
      }
      if (!existsSync(targetPath)) {
        internalLinksValid = false;
        brokenLinks.push(`${file} -> ${href}`);
      }
    }
  }
}

check(
  internalLinksValid,
  `All internal links across prerendered HTML resolve to valid static assets or pages (0 broken links)${
    brokenLinks.length ? `: broken [${brokenLinks.join(", ")}]` : ""
  }`
);

console.log("\n--------------------------");
if (failed === 0) {
  console.log(`All ${passed} smoke tests passed.`);
  process.exit(0);
} else {
  console.error(`${failed} of ${passed + failed} smoke tests failed.`);
  process.exit(1);
}
