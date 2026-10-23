# Feature: Impeccable Audit Remediation
Branch: fix/impeccable-audit-remediation
Delivery: ask-on-risk
Test runner: npm test && npm run typecheck && npm run build

## Specs
- S1: Fix P0 Trust Metric in `src/data/trust.ts`: change "0" to "4+" public projects to reflect real case studies.
- S2: Typography & CSS variable fixes in `src/styles/global.css`: update `@font-face` to `font-family: "Atkinson Hyperlegible"`, add `--font-body: var(--font-atkinson)` and `--background: var(--base)` so preloads bind cleanly and undefined variables are resolved.
- S3: Heading hierarchy correction in `src/components/Header.astro`: replace `<h2 class="logo">` with `<div class="logo">` so the header logo does not precede page `<h1>`.
- S4: Layout and CSS syntax fixes in `src/layouts/StudyCasePost.astro`: replace `color: rgb(var(--text))` with `color: var(--text)`, `background-color: rgb(var(--background))` with `var(--surface0)`, `width: 100vw` with `100%`, and add `loading="lazy"` / `decoding="async"` to hero image.
- S5: Mobile header improvements in `src/components/Header.astro`: increase touch targets to >=44px, add `Escape` key and outside-click listeners to mobile menu drawer, and highlight active navigation link based on current path.
- S6: Mobile hero layout fix in `src/components/Hero.astro`: remove `order: -1` on `.hero-image-container` so the headline and CTAs are not pushed >800px below the fold.
- S7: Constants & form accessibility in `src/consts.ts` and `src/pages/contacto.astro`: fix broken `/proyectos` URL to `/#projects`, add `role="status"` and `aria-live="polite"` to copied email toast.
- S8: Orphaned code cleanup and services integration: remove dead components (`Contact.astro`, `Experience.astro`, `Principles.astro`, `Skills.astro`, `Chip.astro`, `HeaderLink.astro`) and reconcile `src/content/services/` with `src/pages/servicios/[slug].astro`.
- S9: Cloudflare build configuration in `astro.config.mjs`: set `imageService: "compile"` in Cloudflare adapter to optimize prerendered images.

## Tasks
- T1: [S1, S2, S3, S4, S7, S9] Route: inline. Fix core P0/P1 issues: trust metric, typography mismatch & CSS variables, heading hierarchy, StudyCasePost CSS/layout, broken links, and Cloudflare imageService. Commit: 632ac43.
- T2: [S5, S6] Route: inline. Fix responsive design & usability: mobile hero order, header touch targets, mobile menu keyboard trap/outside-click, and active navigation indicator. Commit: b14d4f1.
- T3: [S8] Route: inline. Clean orphaned dead components and connect services content collection. Commit: 0b17573.
- T4: [S1-S9] Route: inline. Verification & full suite check across tests, typecheck, build, and detector anti-pattern cleanup. Commit: 63734de.

## Log
L1: 2026-10-23 User request: "Soluciona todos los problemas que encontraste"
L2: 2026-10-23 Remediated P0 trust metric, font mismatch, CSS variables, heading hierarchy, StudyCasePost styles, mobile hero order, touch targets, and dead components. All 10 smoke tests pass, astro check 0 errors, full static build succeeds.
