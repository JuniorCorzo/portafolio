import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

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

// 1. Service detail page has noindex
const slugPage = read("pages", "servicios", "[slug].astro");
check(
  slugPage.includes('content="noindex') || slugPage.includes("noindex, nofollow"),
  "Service detail page contains noindex meta tag"
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

console.log("\n--------------------------");
if (failed === 0) {
  console.log(`All ${passed} smoke tests passed.`);
  process.exit(0);
} else {
  console.error(`${failed} of ${passed + failed} smoke tests failed.`);
  process.exit(1);
}
