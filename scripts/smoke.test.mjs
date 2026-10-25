import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { getGithubActivity } from "../src/lib/github.ts";

const SRC = resolve(import.meta.dirname, "../src");

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
check(
  globalCss.includes("--color-noir-crust: #000000") &&
    globalCss.includes('[data-theme="noir"]') &&
    globalCss.includes('[data-theme="latte"]'),
  "global.css defines Catppuccin Noir and Latte tokens (including --color-noir-crust: #000000)"
);
check(
  baseHeadContent.includes("localStorage.getItem('theme') || 'noir'") &&
    baseHeadContent.includes("document.documentElement.setAttribute('data-theme', savedTheme)"),
  "BaseHead.astro contains zero-FOUC inline theme script defaulting to noir"
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
    (themeToggleContent.includes("moon") || themeToggleContent.includes("Moon")),
  "ThemeToggle.astro exists, renders accessible button with aria-label='Cambiar tema', and has sun/moon SVG icons"
);

const headerContent = read("components", "Header.astro");
check(
  headerContent.includes("<ThemeToggle") &&
    headerContent.includes("monogram") &&
    (headerContent.includes("&gt;_") || headerContent.includes(">_")),
  "Header.astro embeds ThemeToggle and contains terminal monogram logo mark (>_ AC / angelcorzo)"
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
    githubActivityContent.includes("More"),
  "GithubActivity.astro exists and renders CLI terminal with header, streaks, and legend"
);

// 13. index.astro embeds GithubActivity component under #trust
const indexContent = read("pages", "index.astro");
check(
  indexContent.includes("<GithubActivity") && indexContent.includes("import GithubActivity"),
  "index.astro embeds GithubActivity component"
);

console.log("\n--------------------------");
if (failed === 0) {
  console.log(`All ${passed} smoke tests passed.`);
  process.exit(0);
} else {
  console.error(`${failed} of ${passed + failed} smoke tests failed.`);
  process.exit(1);
}
