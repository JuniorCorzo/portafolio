# Design System — Portafolio Personal

> Category: Personal Portfolio / Developer Site / Business Landing
> Dark theme, terminal aesthetic, Catppuccin Mocha. Developer portfolio with code-snippet visual language.

## 1. Visual Theme & Atmosphere

Este portafolio fusiona dos lenguajes visuales: la **estética de terminal/developer tool** de SkillsMP y la **calidez oscura de Catppuccin Mocha**. El resultado es un espacio que se siente como un IDE premium: oscuro, acogedor, con acentos pastel que guían la mirada sin agredir.

Además de mostrar trabajo, el sitio funciona como **landing de negocio digital**: la home presenta propuesta de valor clara, caminos visibles a servicios, pruebas de confianza y contacto directo. La estética terminal sigue siendo el lenguaje visual, pero ahora sirve a la conversión, no al revés.

La página respira como un editor de código bien configurado. Los títulos de sección usan prefijos tipo terminal (`$`, `>`, `//`) que recuerdan a un shell o un comentario de código. Las cards de proyectos se presentan como snippets con resaltado de sintaxis. Los badges y chips usan colores semánticos del esquema Catppuccin: verde para lo completado, azul para links, malva para highlights, sky para CTAs.

El fondo es consistentemente oscuro (`#1e1e2e`) con capas de superficie que crean profundidad sin depender de sombras pesadas. En lugar de borders tradicionales, se usan bordes sutiles con `rgba(108, 112, 134, 0.2)` — el overlay de Catppuccin — que marcan separación sin interrumpir la fluidez del tema oscuro.

**Key Characteristics:**
- Terminal-inspired headings: `$`, `>`, `//`, `#` prefixes en títulos de sección
- Cards estilo code-snippet: comentarios como headers, monospace para labels técnicos
- Catppuccin Mocha como base cromática con acentos pastel funcionales
- Depth por capas de superficie (crust → base → surface0 → surface1 → surface2) sin sombras agresivas
- Monospace (JetBrains Mono / Fira Code) para elementos de código, sans-serif (Atkinson / system-ui) para lectura
- Chips y badges con colores semánticos de la paleta Catppuccin
- Transiciones suaves (0.3s ease-in-out) en interactive elements
- Backdrop blur en header sticky y modals para profundidad sin opacidad total

## 2. Color Palette & Roles — Catppuccin Mocha

### Base Layer (Backgrounds)

| Token | Hex | CSS Variable | Role |
|-------|-----|-------------|------|
| Crust | `#11111b` | `--crust` | Fondo más profundo, footer, secciones contrastadas |
| Mantle | `#181825` | `--mantle` | Fondo alternativo de secciones |
| Base | `#1e1e2e` | `--base` | Fondo principal de página |

### Surface Layer (Cards, Code Blocks, Elevated)

| Token | Hex | CSS Variable | Role |
|-------|-----|-------------|------|
| Surface 0 | `#313244` | `--surface0` | Cards, code blocks, chips background |
| Surface 1 | `#45475a` | `--surface1` | Card hover, table headers, pre blocks |
| Surface 2 | `#585b70` | `--surface2` | Estados hover intensos, bordes activos |

### Overlay Layer (Borders, Separators, Muted)

| Token | Hex | CSS Variable | Role |
|-------|-----|-------------|------|
| Overlay 0 | `#6c7086` | `--overlay0` | Bordes, separadores, hr |
| Overlay 1 | `#7f849c` | `--overlay1` | Texto placeholder, íconos inactivos |
| Overlay 2 | `#898e9f` | `--overlay2` | Estados disabled |

### Text

| Token | Hex | CSS Variable | Role |
|-------|-----|-------------|------|
| Text | `#cdd6f4` | `--text` | Texto principal, headings |
| Subtext 0 | `#a6adc8` | `--subtext0` | Texto secundario, descripciones |
| Subtext 1 | `#bac2de` | `--subtext1` | Texto de navegación, labels |

### Accent Colors (Semantic Roles)

| Name | Hex | CSS Variable | Semantic Role |
|------|-----|-------------|---------------|
| Rosewater | `#f5e0dc` | `--rosewater` | Delicadeza, citas destacadas |
| Flamingo | `#f2cdcd` | `--flamingo` | Variante de rosa para badges |
| Pink | `#f5c2e7` | `--pink` | Badges "nuevo", highlights femeninos |
| Mauve | `#cba6f7` | `--mauve` | Acento principal, marca personal |
| Red | `#f38ba8` | `--red` | Errores, alertas, badges críticos |
| Maroon | `#eba0ac` | `--maroon` | Variante de red, warnings suaves |
| Peach | `#fab387` | `--peach` | Badges "en progreso", trabajo actual |
| Yellow | `#f9e2af` | `--yellow` | Advertencias, badges "destacado" |
| Green | `#a6e3a1` | `--green` | Éxito, badges "completado", skills |
| Teal | `#94e2d5` | `--teal` | Acento fresco, secciones de contacto |
| Sky | `#89dceb` | `--sky` | Links, CTAs principales, iconos activos |
| Sapphire | `#74c7ec` | `--sapphire` | Links visitados, acentos secundarios |
| Blue | `#89b4fa` | `--blue` | Links, información, badges "info" |
| Lavender | `#b4befe` | `--lavender` | Acento suave, highlights de código |

### Interactive States

- **Focus ring**: `2px solid var(--mauve)` con `outline-offset: 2px`
- **Selection**: `background: var(--lavender); color: #1e1e2e`
- **Hover link**: `color: var(--text)` (desde sky)
- **Hover card**: `background: var(--surface1)`
- **Hover button primary**: `background: var(--mauve-dark); transform: translateY(-2px)`

### Shadows

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-glow-mauve: 0 0 20px rgba(203, 166, 247, 0.15);
--shadow-glow-sky: 0 0 20px rgba(137, 220, 235, 0.15);
```

Las sombras deben ser sutiles. Catppuccin Mocha ya tiene profundidad por contraste entre capas (crust → base → surface). Las sombras solo refuerzan elevación en cards interactivas.

## 3. Typography Rules

### Font Family

- **Primary (body)**: `'Atkinson Hyperlegible', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace (code)**: `'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', ui-monospace, monospace`
- **Terminal accents**: Usar monospace para prefijos de terminal (`$`, `>`, `//`), badges técnicos, y snippets inline

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | CSS |
|------|------|------|--------|-------------|----------------|-----|
| Hero Headline | Atkinson | 4.5rem (72px) | 700 | 1.1 | -0.02em | `.hero-title` |
| Section Title | Atkinson | 2.5rem (40px) | 700 | 1.2 | -0.01em | `h2` |
| Sub-section | Atkinson | 1.875rem (30px) | 600 | 1.3 | normal | `h3` |
| Card Title | Atkinson | 1.25rem (20px) | 600 | 1.4 | normal | `h4` |
| Body | Atkinson | 1rem (16px) | 400 | 1.6 | normal | `body, p` |
| Body Large | Atkinson | 1.125rem (18px) | 400 | 1.8 | normal | `.hero-description` |
| Small / Caption | Atkinson | 0.875rem (14px) | 400 | 1.5 | normal | `small, figcaption` |
| Nav Link | Atkinson | 0.95rem | 500 | 1.5 | normal | `.nav-link` |
| Button | Atkinson | 1rem | 600 | 1.5 | normal | `.cta-button` |
| Terminal Prefix | JetBrains Mono | inherit | 400 | inherit | normal | `.terminal-prefix` |
| Code Inline | JetBrains Mono | 0.875em | 400 | inherit | normal | `code` |
| Code Block | JetBrains Mono | 0.875rem | 400 | 1.6 | normal | `pre > code` |
| Badge / Chip | Atkinson | 0.75rem (12px) | 600 | 1 | normal | `.chip` |

### Principles

- **Atkinson Hyperlegible** es la fuente primaria. Diseñada por el Braille Institute para máxima legibilidad, encaja perfecto con la filosofía de accesibilidad del portfolio.
- **JetBrains Mono** para TODO elemento de código: prefijos de terminal, snippets, badges técnicos, fechas formateadas. La ligature `->` y `=>` son un guiño sutil al developer.
- **Dos pesos**: 400 para lectura, 600-700 para headings y énfasis. Sin pesos intermedios para mantener contraste claro.
- **Terminal aesthetic con moderación**: Los prefijos `$`, `>`, `//` aparecen SOLO en títulos de sección. No sobreusar — cada elemento "code" debe tener razón funcional, no decorativa.

## 4. Component Stylings

### Business / Conversion Layer

- **Home**: actúa como landing principal del negocio.
- **Hero**: debe responder en el primer pantallazo quién sos, qué hacés, para quién y qué sigue.
- **CTA hierarchy**: un CTA primario de conversión y un secundario de exploración; no competir con múltiples CTAs equivalentes.
- **Trust signals**: credenciales, métricas, casos, testimonios o validación verificable siempre visibles cuando existan.
- **Lead capture**: contacto directo por email/WhatsApp y/o agendamiento; si WhatsApp no existe, degradar sin romper la UI.
- **Services / offerings**: servicios o productos deben tener teaser o rutas dedicadas con propuesta, prueba y CTA.
- **About / Blog**: páginas navegables que refuercen credibilidad, expertise y contenido.

### Navigation (Header)

```
┌──────────────────────────────────────────────────┐
│  $ angelcorzo    Habilidades  Experiencia  [...]  │
│                         Proyectos  [CV Download]  │
└──────────────────────────────────────────────────┘
```

- **Position**: Sticky top, z-index 100
- **Background**: `rgba(var(--crust-rgb), 0.96)` + `backdrop-filter: blur(5px)`
- **Border bottom**: `1px solid rgba(108, 112, 134, 0.2)` (overlay0 al 20%)
- **Height**: 70px desktop, 60px tablet, 56px mobile
- **Logo**: Nombre del developer, weight 700, 1.25rem. Hover → `color: var(--mauve)`
- **Nav links**: 0.95rem, weight 500, `color: var(--subtext0)`. Hover → `color: var(--text)` + underline animado con `::after` pseudo-element (2px height, `var(--mauve)`)
- **CV Button**: `background: rgba(var(--lavender-rgb), 0.1)`, border `2px solid rgba(var(--lavender-rgb), 0.1)`, radius 6px. Hover → `background: var(--lavender)`, `color: var(--crust)`, `transform: translateY(-2px)`
- **Mobile**: Hamburguesa animada (tres barras → X). Menú dropdown full-width con backdrop blur

### Buttons

**Primary CTA**
```css
background: var(--mauve);
color: var(--crust);
border: 2px solid var(--mauve);
padding: 10px 32px;
border-radius: 6px;
font-weight: 700;
transition: all 0.3s ease-in-out;
```
Hover: `background: var(--mauve-dark)`, `transform: translateY(-2px)`, `box-shadow: 0 3px 10px rgba(203, 166, 247, 0.3)`. El ícono interno se desplaza 4px a la derecha.

**Secondary / Ghost**
```css
background: transparent;
color: var(--mauve);
border: 2px solid var(--mauve);
padding: 10px 32px;
border-radius: 6px;
font-weight: 600;
transition: all 0.3s ease-in-out;
```
Hover: `background: var(--mauve)`, `color: var(--crust)`, peso cambia a 700. Ícono rota -25deg.

### Chips / Badges

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 16px;
  border-radius: 9999px;
  border: 1px solid;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
}
```

Colores semánticos por tipo:
- **Habilidades**: `color: var(--green)`, `background: rgba(var(--green-rgb), 0.1)`, `border-color: var(--green)`
- **Disponible**: `color: var(--green)`, fondo y borde verdes
- **Años exp**: `color: var(--peach)`, fondo y borde peach
- **Rol**: `color: var(--mauve)`, fondo y borde mauve
- **Tecnología**: `color: var(--sky)`, fondo y borde sky

### Cards (Projects, Experience, Skills)

**Project Card — Estilo Code Snippet**

```
// project.tsx                        <-- header tipo comentario
$ cat proyecto-destacado              <-- terminal prompt
                                     <-- espacio
Descripción del proyecto va aquí...  <-- body
                                     <-- espacio
[React] [TypeScript] [PostgreSQL]    <-- tech badges
> ver proyecto                        <-- link tipo comando
```

- **Background**: `var(--surface0)` (`#313244`)
- **Border**: `1px solid var(--overlay0)` (`rgba(108, 112, 134, 0.3)`)
- **Radius**: 8px
- **Padding**: 1.5rem
- **Header**: Monospace, color `var(--overlay1)`, prefix `//` o `#`, font-size 0.8rem, weight 500
- **Title**: 1.25rem, weight 600, `var(--text)`, optional prefix `$` en monospace
- **Description**: 0.95rem, weight 400, `var(--subtext0)`, line-height 1.6
- **Tech badges**: Chips inline con colores semánticos
- **Hover**: `background: var(--surface1)`, `transform: translateY(-2px)`, `box-shadow: var(--shadow-md)`. Transición 0.3s ease-in-out.
- **Link**: ">" prefix en monospace, color `var(--sky)`, hover → `color: var(--sapphire)`

**Experience Card — Timeline Style**

```
┌─ 2024 — Presente ─────────────────────────────┐
│                                                │
│  $ Senior Frontend Engineer                    │
│  TechCorp · Remoto                             │
│                                                │
│  // Impacto                                    │
│  • Lideré migración de Angular a React         │
│  • Reduje bundle size en un 40%                │
│                                                │
│  [React] [TypeScript] [GraphQL]                │
│                                                │
└────────────────────────────────────────────────┘
```

- Estructura similar a project card pero con timeline indicator (barra vertical o badge de fecha)
- Fecha en la parte superior: 0.85rem, `var(--overlay1)`, monospace
- Separador visual entre experiencias: `1px solid var(--overlay0)` o padding generoso

**Skills Section — Grid de Chips**

```
// habilidades.sh

$ cat skills.json | jq '.languages'
[TypeScript] [Go] [Python] [Rust]

$ cat skills.json | jq '.frontend'
[React] [Astro] [Next.js] [Tailwind]

$ cat skills.json | jq '.infra'
[AWS] [Docker] [K8s] [Terraform]
```

- Grid de 3-4 columnas por categoría
- Cada categoría con header monospace (comando inventado)
- Chips grandes: padding 8px 20px, font-size 0.9rem, radius 9999px
- Colores semánticos por categoría: verde para lenguajes, sky para frontend, peach para infra
- Hover en chip: scale 1.05, shadow sutil

### Hero Section

```
┌─────────────────────────────────────────────────┐
│  [Disponible] [5+ años exp] [Senior]             │  ← chips
│                                                  │
│  Hola, soy                                      │
│  Angel Corzo [Full-Stack Developer]              │  ← headline
│  Construyo productos digitales...                │  ← accent
│                                                  │
│  Descripción que explica quién sos y qué         │
│  hacés. Con links a proyectos y contacto.        │
│                                                  │
│  [Proyectos →]  [Contactar ↗]                    │  ← CTAs
│                                                  │
│                              ┌──────────┐        │
│                              │          │        │
│                              │  Foto    │        │  ← hero image
│                              │          │        │
│                              └──────────┘        │
└─────────────────────────────────────────────────┘
```

- **Background**: `linear-gradient(135deg, var(--crust) 0%, var(--base) 100%)`
- **Ambient glow**: `radial-gradient(circle, rgba(203, 166, 247, 0.08) 0%, transparent 70%)` en una esquina (pseudo-element `::before`)
- **Layout**: CSS Grid 12 columnas — 7 para contenido, 5 para imagen
- **Headline**: 4.5rem, weight 700, line-height 1.1. El nombre usa `var(--sky)` para destacar: `[Angel Corzo]`
- **Sub-headline**: 1.5rem, weight 700, `var(--text)`
- **Description**: 1.125rem, `var(--subtext0)`, line-height 1.8
- **Hero image**: aspect-ratio 4/5, max-width 460px, border `1px solid var(--mauve)`, `box-shadow: 0 0 20px rgba(203, 166, 247, 0.2)`
- **Responsive**: <1024px → flex column-reverse (imagen arriba), headline 3rem. <640px → headline 2.25rem, CTAs stack vertical

### Section Headers (Terminal Style)

```html
<!-- Ejemplo: sección de Proyectos -->
<section id="projects">
  <h2>
    <span class="terminal-prefix">$</span> ls proyectos/
  </h2>
  <p class="section-description">// cosas que construí</p>
</section>
```

- **Terminal prefix** (`$`, `>`, `#`, `//`): JetBrains Mono, `var(--overlay1)`. No seleccionable (`user-select: none`).
- **Section title**: 2.5rem, weight 700, `var(--text)`, line-height 1.2
- **Section description**: 1rem, `var(--subtext0)`, opcional prefix `//` o `#`
- El prefix y el título están en la misma línea visual pero el prefix es sutil — no roba protagonismo

### Contact Section

```
┌──────────────────────────────────────────────┐
│                                              │
│  $ mailto:hola@angelcorzo.dev                │
│                                              │
│  // ¿hablamos?                               │
│  Siempre abierto a nuevas oportunidades.      │
│  Podés contactarme por email o LinkedIn.      │
│                                              │
│  [✉ Copiar email]  [in LinkedIn]  [GitHub]   │
│                                              │
└──────────────────────────────────────────────┘
```

- **Background**: `var(--crust)` o `var(--mantle)` para diferenciar del resto
- **Email en formato comando**: `$ mailto:...`, monospace, `var(--teal)`
- **Links sociales**: Botones ghost con íconos, hover → `color: var(--mauve)`
- **Copy email button**: `var(--teal)` como color de acento

### Content & Routing Model

- **Routes core**: `/`, `/servicios`, `/sobre-mi`, `/blog`, `/contacto`.
- **Service pages**: `/servicios/[slug]` para ofertas específicas; si aún son stubs, deben llevar `noindex`.
- **Blog pages**: contenido editorial en MDX para profundidad y autoridad.
- **Validation**: la home debe priorizar credenciales, métricas y resultados verificables antes de pedir contacto.
- **Fallbacks**: placeholders visibles sólo en `env.example` o contenido claramente marcado como pendiente.

### Footer

```
┌──────────────────────────────────────────────────┐
│  // footer.json                                  │
│                                                  │
│  {                                               │
│    "built_with": ["Astro", "Tailwind", "☕"],     │
│    "deployed_on": "Cloudflare Pages",             │
│    "source": "github.com/angelcorzo/portafolio",  │
│    "license": "MIT",                             │
│    "year": 2026                                  │
│  }                                               │
│                                                  │
└──────────────────────────────────────────────────┘
```

- **Estilo**: Código JSON minimalista
- **Background**: `var(--crust)` (`#11111b`)
- **Texto**: 0.8rem, `var(--overlay1)`, JetBrains Mono
- **Links**: `var(--sky)`, sin underline por defecto, aparece en hover
- **Padding**: Generoso arriba, compacto abajo
- **No iconos grandes ni logos** — solo texto monoespaciado que cierra el tema terminal

### Divider / Section Separator

```css
hr {
  border: none;
  border-top: 1px solid var(--overlay0);
  margin: 3rem 0;
}
```

Simple. Sin gradientes ni florituras. La separación la da el espacio, no el borde.

## 5. Layout Principles

### Spacing System

- Base unit: 8px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120

| Context | Vertical Padding | Horizontal Padding |
|---------|-----------------|-------------------|
| Section | 80px desktop, 48px mobile | 24px desktop, 16px mobile |
| Card internal | 1.5rem (24px) | 1.5rem (24px) |
| Hero | 3rem (48px) | 24px |
| Gap between cards | 24px (grid gap) | — |
| Gap between sections | 0 (spacing is padding) | — |

### Grid & Container

- **Max content width**: 1200px
- **Grid**: 12-column CSS Grid para layouts complejos (hero), auto-fit/auto-fill para cards
- **Card grids**: `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` con gap 24px
- **Single column**: 720px max-width para contenido de lectura (blog posts, casos de estudio)
- **Full-width sections**: El fondo abarca todo el viewport, el contenido está centrado en 1200px

### Whitespace Philosophy

- **Respirar**: Cada sección tiene mínimo 80px de padding vertical. El espacio blanco (oscuro) es parte del diseño.
- **Agrupar**: Cards relacionadas comparten grid gap. Secciones no relacionadas se separan con padding generoso.
- **No comprimir**: En mobile, el padding se reduce pero nunca baja de 48px entre secciones.

### Border Radius Scale

| Context | Radius |
|---------|--------|
| Code inline | 4px |
| Buttons, inputs | 6px |
| Cards | 8px |
| Images | 8px |
| Chips, badges | 9999px (pill) |
| Modals | 12px |

### Depth & Elevation

| Level | Background | Shadow | Use |
|-------|-----------|--------|-----|
| Base | `var(--base)` | none | Page background |
| Raised | `var(--surface0)` | none | Cards, code blocks |
| Interactive | `var(--surface0)` → hover `var(--surface1)` | `var(--shadow-md)` on hover | Clickable cards |
| Overlay | `rgba(17, 17, 27, 0.8)` + blur | `var(--shadow-lg)` | Modals, mobile menu |
| Sticky | `rgba(30, 30, 46, 0.96)` + blur | bottom border | Header |

**Filosofía**: Catppuccin Mocha crea profundidad por contraste entre capas. Usar sombras SOLO para indicar interactividad (hover de cards) o elevation real (modals, dropdowns). No saturar con sombras decorativas.

## 6. Terminal Aesthetic Guidelines

### Dónde usar elementos terminal

| Elemento | Prefijo | Fuente | Ejemplo |
|----------|---------|--------|---------|
| Section title | `$`, `>`, `#` | Mono | `$ ls proyectos/` |
| Section subtitle | `//`, `#` | Mono | `// cosas que construí` |
| Card header | `//`, `#` | Mono | `// project.tsx` |
| Card title link | `>` | Mono | `> ver proyecto` |
| Footer | `//`, JSON | Mono | `// footer.json` |
| Contacto | `$` | Mono | `$ mailto:hola@domain` |
| Badge "Disponible" | — | Sans | `[ Disponible ]` |

### Dónde NO usar elementos terminal

- ❌ Párrafos de cuerpo (la legibilidad manda)
- ❌ Navegación principal (el logo sí puede, pero los links no)
- ❌ Botones CTA (usan íconos, no prefijos)
- ❌ Títulos de cards (solo el header tipo comentario arriba)
- ❌ Listas de bullet points en experiencia
- ❌ Citas / testimonios
- ❌ Texto legal o footer informativo

**Regla de oro**: Si no suma claridad o carácter, no lleva prefijo terminal. El objetivo es evocar un entorno de desarrollo, no hacer la página ilegible.

## 7. Color Semantics (Catppuccin Mapping)

| Semantic Meaning | Catppuccin Color | Use |
|-----------------|-----------------|-----|
| Primary brand | Mauve (`#cba6f7`) | CTAs principales, marca personal |
| Links, CTAs | Sky (`#89dceb`) | Links, iconos activos |
| Link hover | Sapphire (`#74c7ec`) | Hover de links |
| Success / Done | Green (`#a6e3a1`) | Badges "completado", skills |
| In Progress | Peach (`#fab387`) | Badges "WIP", años de experiencia |
| Info / Tech | Blue (`#89b4fa`) | Badges tecnológicos, tooltips |
| Warning | Yellow (`#f9e2af`) | Advertencias, badges "destacado" |
| Error / Critical | Red (`#f38ba8`) | Errores (poco uso en portfolio) |
| Highlight / New | Pink (`#f5c2e7`) | Badges "nuevo", highlights |
| Soft accent | Lavender (`#b4befe`) | Highlights de código, selection |
| Code / Terminal | Overlay 1 (`#7f849c`) | Prefijos terminal, comentarios |
| Contact | Teal (`#94e2d5`) | Email, sección de contacto |

## 8. Do's and Don'ts

### Do
- Usar `var(--mauve)` como color de marca principal para CTAs y acentos
- Usar JetBrains Mono para TODO elemento de código o terminal (prefijos, snippets, badges técnicos)
- Usar Atkinson Hyperlegible para todo texto de lectura (cuerpo, headings, navegación)
- Agrupar contenido relacionado en cards con `background: var(--surface0)` y bordes sutiles
- Usar transiciones 0.3s ease-in-out consistentemente en elementos interactivos
- Mantener el backdrop blur en header y overlays para profundidad
- Usar colores semánticos de Catppuccin para badges/chips según su significado
- Implementar focus-visible en todos los elementos interactivos con `outline: 2px solid var(--mauve)`
- Probar contraste: `--text` (#cdd6f4) sobre `--base` (#1e1e2e) tiene ratio > 10:1

### Don't
- No usar más de 2-3 acentos Catppuccin en una misma vista — la paleta es grande, pero la moderación es clave
- No usar prefijos terminal en más del 20% del contenido visible
- No usar sombras pesadas — la profundidad viene del contraste entre capas surface
- No usar texto blanco puro (#fff) — usar siempre `var(--text)` (#cdd6f4)
- No usar fondos claros — el portfolio es consistentemente oscuro
- No mezclar fuentes mono sin propósito — si es mono, debe evocar código
- No hacer cards con bordes gruesos (>1px) — los bordes deben ser sutiles, casi imperceptibles
- No saturar con animaciones — 0.3s ease-in-out es suficiente. Sin bounce, sin elastic.

## 9. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, headline 2.25rem, padding reducido |
| Tablet | 640-1024px | Hero stack vertical, 2-col grids, headline 3rem |
| Desktop | >1024px | Full layout, 3-col grids, 12-col hero |

### Touch Targets
- Todos los botones: mínimo 44px height (accesibilidad)
- Links de navegación: padding generoso en mobile
- Chips: 28px+ height para tap cómodo
- Social links en contacto: 48x48px touch area

### Collapsing Strategy
- **Hero**: 12-col grid → flex column-reverse → single column
- **Cards**: 3-col → 2-col → 1-col
- **Nav**: Horizontal links → hamburger menu con dropdown
- **Skills grid**: 4-col → 3-col → 2-col
- **Footer**: Multi-line → stacked

## 10. Implementation Stack

- **Framework**: Astro 5.x con Cloudflare Pages adapter
- **CSS**: Tailwind CSS v4 + CSS custom properties (@theme)
- **Fuentes**: Atkinson Hyperlegible (woff2 local), JetBrains Mono (CDN o local)
- **Íconos**: astro-icon con packs Lucide + Heroicons
- **MDX**: Para blog posts y casos de estudio
- **Content collections**: `blog`, `services`, `study-case` y cualquier landing futura
- **Config / env**: variables para WhatsApp, Calendly y otros CTAs externos

### Tailwind v4 Theme Extension

```css
@import "tailwindcss";

@theme {
  --color-crust: #11111b;
  --color-mantle: #181825;
  --color-base: #1e1e2e;
  --color-surface-0: #313244;
  --color-surface-1: #45475a;
  --color-surface-2: #585b70;
  --color-overlay-0: #6c7086;
  --color-overlay-1: #7f849c;
  --color-overlay-2: #898e9f;
  --color-text: #cdd6f4;
  --color-subtext-0: #a6adc8;
  --color-subtext-1: #bac2de;
  --color-mauve: #cba6f7;
  --color-sky: #89dceb;
  --color-green: #a6e3a1;
  --color-peach: #fab387;
  --color-blue: #89b4fa;
  --color-teal: #94e2d5;
  --color-red: #f38ba8;
  --color-yellow: #f9e2af;
  --color-pink: #f5c2e7;
  --color-lavender: #b4befe;
  --color-rosewater: #f5e0dc;
  --font-atkinson: "Atkinson Hyperlegible", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
}
```

## 11. Agent Prompt Guide

### Quick Color Reference for Implementation

```
Background: var(--base) = #1e1e2e
Cards: var(--surface0) = #313244
Text: var(--text) = #cdd6f4
Muted: var(--subtext0) = #a6adc8
Border: var(--overlay0) = #6c7086 (al 20-30% opacity)
Primary CTA: var(--mauve) = #cba6f7
Links: var(--sky) = #89dceb
Code: var(--overlay1) = #7f849c (terminal prefixes)
Success: var(--green) = #a6e3a1
WIP/XP: var(--peach) = #fab387
```

### Example Component Prompts

- "Creá una card de proyecto con header `// project.tsx` en monospace overlay1, título con peso 600 en text, descripción en subtext0, y badges de tecnología con colores de Catppuccin. La card usa surface0 como fondo, borde overlay0 al 20%, radius 8px, padding 1.5rem. Hover: surface1 + translateY(-2px)."

- "Diseñá el hero section: fondo gradient crust→base, glow mauve sutil en esquina superior derecha. Headline 4.5rem weight 700 con el nombre en sky. Chips de estado arriba con colores semánticos. CTAs: primary con mauve, secondary ghost con borde mauve. Grid 12 columnas, 7 para texto, 5 para imagen con borde mauve y box-shadow glow."

- "Armá el header sticky con backdrop blur. Logo del nombre en text, weight 700. Nav links en subtext0 con underline animado en mauve al hover. Botón CV con fondo lavender al 10% y borde sutil. Mobile: hamburguesa animada → X, menú dropdown full-width con backdrop blur."

- "Creá la sección de habilidades con grid de categorías. Cada categoría lleva header monospace tipo `$ cat skills.json | jq '.lenguajes'`. Chips en pill shape con colores semánticos: green para lenguajes, sky para frontend, peach para infra. Hover: scale 1.05 con transición."

- "Diseñá la home como landing de negocio: hero con propuesta de valor, CTA primario de conversión, trust signals, teaser de servicios, y acceso a about/blog/contacto sin romper la estética terminal."

### Iteration Guide

1. **Empezá por los tokens CSS**: Definí todas las custom properties en `:root`. Todo componente referencia variables, nunca valores hardcodeados.
2. **El tema oscuro es el default**: No necesitás modo claro. Catppuccin Mocha es el único tema.
3. **Terminal aesthetic con propósito**: Cada `$`, `>`, `//` debe tener razón de ser. Si no la tiene, no va.
4. **Menos es más con los acentos**: 2-3 colores accent por vista. El resto es texto y superficie.
5. **Probá el contraste**: `--text` sobre `--base` = >10:1. `--subtext0` sobre `--base` = >7:1. Cumplimos WCAG AAA.
6. **Las cards respiran**: Padding generoso (1.5rem), gap generoso (24px). No amontonar.
7. **Mobile first**: Empezá por el layout móvil y escalá hacia arriba con breakpoints.

## 12. Business Landing Rules

- La home es la página de aterrizaje principal del negocio.
- El héroe debe decir qué hacés, para quién y cuál es el siguiente paso.
- El CTA primario apunta a conversión; el secundario a exploración.
- Si faltan testimonios reales, usá validación alternativa o estado pendiente transparente.
- Las páginas de servicios pueden empezar como stubs, pero deben estar marcadas con `noindex` hasta tener contenido real.
- WhatsApp, Calendly y otros contactos externos viven detrás de variables de entorno o config explícita.
- No sacrificar claridad comercial por decoración terminal.
