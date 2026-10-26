# Feature: Vim Mode & Readonly Statusline Integration
Branch: feat/visual-rebranding-noir-latte
Delivery: ask-on-risk
Test runner: npm test && npm run typecheck && npm run build

## Specs
- S1: Statusline enhancements in `src/components/Footer.astro`: add prominent `[RO]` / `[readonly]` badge next to current file buffer, dynamic file buffer name according to route, support reactive mode indicators (`NORMAL`, `VISUAL`, `COMMAND`), live scroll percentage (`Ln XX%`), and interactive command line / toast area.
- S2: Desktop-only Vim engine in `src/components/VimMode.astro` / `src/scripts/vim-mode.ts`:
  - Scoped to desktop viewports (`>= 1024px`) and deactivated inside input/textarea elements.
  - Normal mode motions: `j`/`k` (line scroll), `d`/`u` (half page), `gg`/`G` (top/bottom), `]]`/`[[` (section jumps).
  - Readonly enforcement: pressing editing keys (`i`, `a`, `o`, `c`, `s`, `r`) displays warning `W10: Warning: Changing a readonly file ('modifiable' is off)`.
  - Yanking: `ye` copies email, `yy` copies focused card/section text.
  - Command-line mode (`:`): `:w` (shows `E45: 'readonly' option is set`), `:w!` (shows `E21: Cannot make changes, 'modifiable' is off`), `:q`, `:cv`, `:theme`, `:wa`, `:1`-`:5` (tmux tabs), `:help`.
- S3: Help buffer / modal (`:help` or `?`) presenting keyboard motions, commands, and readonly rules in Catppuccin terminal aesthetic.
- S4: Automated smoke tests in `scripts/smoke.test.mjs` ensuring Vim mode components, `[RO]` indicator, and statusline bindings pass with zero regressions.
- S5: Full verification: smoke tests, typecheck (`astro check`), and static production build.
- S6: Always visible fixed statusbar: `.terminal-statusbar` in `src/components/Footer.astro` is fixed to the bottom of the viewport (`position: fixed; bottom: 0; left: 0; width: 100%; z-index: 80;`), with appropriate offset for `.whatsapp-float` and footer padding.

## Tasks
- T1: [S1, S6] Route: inline. Update `src/components/Footer.astro` and `src/components/WhatsAppButton.astro` to make the statusline fixed, ultrawide-aligned (max 1600px), with dynamic buffer name and `[RO]` badge. Status: completed.
- T2: [S2, S3] Route: inline. Implement `src/components/VimMode.astro` and `src/components/VimHelpModal.astro` with keyboard state machine, motions, readonly warnings, yanks, command line prompt, and `:help` float window. Status: completed.
- T3: [S4, S5] Route: inline. Add smoke tests in `scripts/smoke.test.mjs` and execute full test/typecheck/build suite. Status: completed.

## Log
L1: 2026-10-25 User request: "me gustaria añadir un modo vim, es posible? pero que sea util, tipo que uno pueda copiar y demas cosas que se puede hacer en nvim menos editar, claramente eso solo se puede en desktop ... tambien dejar en claro el readonly"
L2: 2026-10-25 User request: "si, deja siempre visible la barra del footer"
L3: 2026-10-25 Implemented fixed bottom statusbar in Footer.astro with ultrawide ceiling (max 1600px), dynamic file buffer according to route, and [RO] badge. Offset floating WhatsApp button to bottom: calc(24px + 36px) to prevent overlap.
L4: 2026-10-25 Implemented VimMode.astro and VimHelpModal.astro. Added desktop guards (window.innerWidth >= 1024 and no touch), form input isolation, motions (j/k, d/u, gg/G, ]]/[[), yanking (ye for email, yy for section), command line mode (:cv, :wa, :theme, :1-:5, :help), and readonly protection (i, a, o, c, s, r triggers W10 warning).
L5: 2026-10-25 Verified via agent-browser: ? opens float help modal, Escape closes it, i triggers W10 readonly warning in yellow, :w triggers E45 readonly error in red, scroll updates Ln %. All 44 smoke tests pass, astro check 0 errors, full static build succeeds in 24s.
