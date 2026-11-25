import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT_DIR, "src", "content", "blog");
const OUTPUT_PATH = path.join(ROOT_DIR, "src", "data", "reading-times.json");

const WORDS_PER_MINUTE = 200;
const CODE_WORD_WEIGHT = 0.5;
const FRONTMATTER_RE = /^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/;
const FENCED_CODE_RE = /(?:^|\r?\n)(```|~~~)[^\r\n]*\r?\n([\s\S]*?)\r?\n\1(?=\r?\n|$)/g;
const WORD_RE = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

function collectMarkdownFiles(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function toAstroSlug(filePath) {
  return path
    .relative(BLOG_DIR, filePath)
    .split(path.sep)
    .join("/")
    .replace(/\.(md|mdx)$/i, "")
    .toLowerCase();
}

function stripFrontmatter(raw) {
  return raw.replace(FRONTMATTER_RE, "");
}

function sha256(content) {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

function countWords(text) {
  const matches = text.match(WORD_RE);
  return matches ? matches.length : 0;
}

function computeReadingStats(body) {
  let codeWords = 0;

  const proseOnly = body.replace(FENCED_CODE_RE, (_match, _fence, codeBody) => {
    codeWords += countWords(codeBody);
    return "\n";
  });

  const cleanedProse = proseOnly
    // Remove top-level MDX import/export statements
    .replace(/^(?:import|export)\s+[^\r\n]+$/gm, " ")
    // Remove HTML and MDX comments
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    // Keep image alt text and link labels, drop URLs
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, " $1 ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, " $1 ")
    // Remove bare URLs
    .replace(/https?:\/\/\S+/g, " ")
    // Remove HTML/MDX tags
    .replace(/<[^>]+>/g, " ")
    // Remove inline code backticks while preserving content
    .replace(/`([^`]*)`/g, " $1 ");

  const proseWords = countWords(cleanedProse);
  const words = proseWords + codeWords;
  const effectiveWords = proseWords + codeWords * CODE_WORD_WEIGHT;
  const minutes = Math.max(1, Math.round(effectiveWords / WORDS_PER_MINUTE));

  return { minutes, words };
}

function readExistingCache() {
  if (!existsSync(OUTPUT_PATH)) return {};
  try {
    const parsed = JSON.parse(readFileSync(OUTPUT_PATH, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function main() {
  const existing = readExistingCache();
  const files = collectMarkdownFiles(BLOG_DIR);
  const nextEntries = {};

  let reused = 0;
  let computed = 0;

  for (const filePath of files) {
    const slug = toAstroSlug(filePath);
    const raw = readFileSync(filePath, "utf8");
    const body = stripFrontmatter(raw);
    const hash = sha256(body);

    const cached = existing[slug];
    if (
      cached &&
      cached.hash === hash &&
      typeof cached.minutes === "number" &&
      typeof cached.words === "number"
    ) {
      nextEntries[slug] = cached;
      reused += 1;
    } else {
      const { minutes, words } = computeReadingStats(body);
      nextEntries[slug] = { minutes, words, hash };
      computed += 1;
    }
  }

  const sortedOutput = {};
  for (const slug of Object.keys(nextEntries).sort()) {
    sortedOutput[slug] = nextEntries[slug];
  }

  const serialized = `${JSON.stringify(sortedOutput, null, 2)}\n`;
  mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

  const previousSerialized = existsSync(OUTPUT_PATH)
    ? readFileSync(OUTPUT_PATH, "utf8")
    : null;

  if (previousSerialized !== serialized) {
    writeFileSync(OUTPUT_PATH, serialized, "utf8");
  }

  const pruned = Object.keys(existing).filter(
    (slug) => !(slug in sortedOutput),
  ).length;

  console.log(
    `[reading-times] total=${Object.keys(sortedOutput).length} computed=${computed} reused=${reused} pruned=${pruned}`,
  );
}

main();
