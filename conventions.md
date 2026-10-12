# Conventions & Project Rules — angelcorzo.dev

## Stack
- Framework: Astro 5 (SSR / Static with Cloudflare Pages adapter)
- Styling: Tailwind CSS v4, Catppuccin Mocha color system
- Package Manager: npm / bun / pnpm

## SEO & Indexing Rules
- Core routes (`/`, `/servicios`, `/sobre-mi`, `/blog`, `/contacto`) and detail routes (`/study-case/*`, `/servicios/*`, `/blog/*`) must be indexable unless explicitly documented stubs.
- Canonical URLs must include trailing slash format consistent with Astro configuration.
- Meta robots: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` on all public content pages.
- No duplicate or contradictory `<meta name="robots">` tags.

## Git & Commits
- Conventional Commits only (e.g. `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- Never add AI attribution or "Co-Authored-By" tags.

## Quality & Testing
- Automated verification via `node scripts/smoke.test.mjs` must pass before pushing.
