# Portafolio Personal

Portafolio profesional personal construido con **Astro**, diseñado para mostrar proyectos, experiencia, habilidades y estudios de caso. Desplegado en Cloudflare Workers.

## 🌐 Características

- ✅ Diseño moderno y responsivo con Tailwind CSS
- ✅ Rendimiento optimizado (100/100 Lighthouse)
- ✅ Soporte para Markdown
- ✅ Casos de estudio detallados con diagramas Mermaid
- ✅ SEO-friendly con sitemap y OpenGraph
- ✅ Totalmente tipado con TypeScript
- ✅ Desplegado en Cloudflare Workers

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables de Astro
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Skills.astro
│   ├── Projects.astro
│   ├── Experience.astro
│   └── Contact.astro
├── content/         # Contenido en Markdown
│   ├── docs/
│   └── study-case/  # Casos de estudio
├── layouts/         # Layouts de página
├── pages/           # Rutas principales
│   ├── index.astro
│   └── study-case/
├── styles/          # Estilos globales
└── consts.ts        # Constantes del proyecto
```

## 🚀 Primeros Pasos

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

El servidor local estará disponible en `http://localhost:4321`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

Para previsualizar la versión de producción localmente.

## 📋 Comandos Disponibles

| Comando                   | Descripción                             |
| :------------------------ | :-------------------------------------- |
| `npm run dev`             | Inicia servidor local de desarrollo     |
| `npm run build`           | Construye el sitio para producción      |
| `npm run preview`         | Previsualiza el build localmente        |
| `npm run deploy`          | Deploya a Cloudflare Workers            |
| `npm run check`           | Valida tipos, build y dry-run de deploy |
| `npm run astro -- --help` | Ayuda del CLI de Astro                  |

## 🔗 Sitio Desplegado

https://angelcorzo.dev

## 🛠️ Tecnologías

- **Astro 5** - Framework principal
- **TypeScript** - Tipado
- **Mermaid** - Diagramas
- **Cloudflare Workers** - Hosting
- **Iconify** - Iconos
