# Feature: Impeccable Critique, Polish, Harden, Animate & WhatsApp Lucide Icon Migration
Branch: feat/visual-rebranding-noir-latte
Delivery: ask-on-risk
Test runner: npm test && npm run typecheck && npm run build

## Specs
- S1: Replace emoji `💬` in "Hablemos por WhatsApp" buttons across `src/components/Hero.astro`, `src/pages/index.astro`, and `src/pages/servicios/index.astro` with `<Icon name="lucide:message-circle" size={18} />`, update button styles to flex inline with consistent gap, and align `scripts/smoke.test.mjs` assertions so all 41+ smoke tests pass without regressions.
- S2: Polish CSS anti-patterns in `src/styles/global.css` (refining `blockquote` border-left from 3px to 1px/tokenized subtle styling to resolve `impeccable detect` slop warning to 0 exit code).
- S3: Harden layout and responsiveness: guarantee touch targets >= 44px, verify overflow wrapping (`overflow-wrap: break-word`), secure external target rels, and ensure resilient Catppuccin Noir/Latte tokens across all screen widths.
- S4: Purposeful motion and animations: add refined terminal micro-interactions (subtle status dot pulse, terminal prompt hover accent, smooth card transition curves) guarded strictly by `@media (prefers-reduced-motion: reduce)`.
- S5: Full verification: run `impeccable detect`, smoke tests, Astro typecheck, and production build with zero errors.

## Tasks
- T1: [S1, S2] Route: delegated (writer). Migrate WhatsApp buttons to Lucide icon, resolve smoke test checks, and eliminate detector warning in global.css. Commit: 23f64f4.
- T2: [S3, S4] Route: delegated (writer). Implement hardening (touch targets, overflow, accessibility) and purposeful animations with prefers-reduced-motion. Commit: 23f64f4.
- T3: [S5] Route: inline. Run complete verification gate (tests, typecheck, build, and impeccable detect). Commit: 23f64f4.

## Log
L1: 2026-10-25 User request: "/impeccable critique polish harden animete \n\ntambien cambia el logo del boton Hablemos por Whatsapp el icono de lucide \n\nlanza subagente para la implementacion"
L2: 2026-10-25 Delegated writer executed T1 & T2. Migrated emoji to Lucide icon in Hero, Index, and Servicios; cleaned blockquote border-left to 1px (impeccable detect 0 warnings); hardened touch targets to >=44px and added overflow-wrap; added purposeful cubic-bezier transitions and terminal-blink with prefers-reduced-motion fallback. All 41 smoke tests pass, astro check 0 errors, full static build succeeds.
