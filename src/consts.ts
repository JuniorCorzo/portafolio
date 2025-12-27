import { Server, Brush, Gauge } from "@lucide/astro";

// Portfolio Configuration
export const SITE_TITLE = "Angel Corzo";
export const SITE_DESCRIPTION =
  "Professional portfolio showcasing Full Stack development expertise in React, Node.js, and DevOps";

// Developer Information
export const DEVELOPER_NAME = "Angel Corzo";
export const DEVELOPER_EMAIL = "hello@angelcorzo.dev";
export const DEVELOPER_LOCATION = "Remote";

// Hero Section
export const HERO_HEADLINE_1 = "Hola, soy";
export const HERO_HEADLINE_2 = "Desarrollador Full Stack";
export const HERO_DESCRIPTION =
  "Fusiono lógica y creatividad para construir productos digitales excepcionales. Como desarrollador Full Stack con un enfoque meticuloso en UI/UX, utilizo tecnologías modernas para transformar ideas complejas en soluciones escalables, accesibles y de alto impacto.";
export const HERO_IMAGE = "/images/hero.webp";

// Development Principles
export const PRINCIPLES = [
  {
    icon: Server,
    title: "Arquitectura Escalable",
    description:
      "Diseño sistemas pensados para crecer. Desde la estructura de base de datos hasta la modularidad del frontend, cada línea de código tiene un propósito a largo plazo.",
  },
  {
    icon: Brush,
    title: "Diseño Pixel Perfect",
    description:
      "La belleza está en los detalles. Me aseguro de que la implementación final respete la visión del diseño, cuidando la tipografía, el espaciado y las micro-interacciones.",
  },
  {
    icon: Gauge,
    title: "Alto Rendimiento",
    description:
      'La velocidad es una "feature". Optimizo assets, gestiono el estado de manera eficiente y priorizo las Core Web Vitals para tiempos de carga mínimos.',
  },
];

// Skills
export const SKILLS = {
  frontend: ["React", "Astro", "TypeScript", "Tailwind CSS", "Redux", "HTML5"],
  backend: ["Java", "Spring Boot", "MongoDB", "PostgreSQL"],
  devops: ["Docker"],
  testing: ["JUnit"],
};

// Experience Timeline
export const EXPERIENCE = [
  {
    period: "Abril 2024 - Octubre 2024",
    title: "Aprendiz Desarrollador Web",
    company: "Ecopetrol",
    highlights: [
      "Desarrollé aplicación web en React para visualización de datos de la planta de gas Oripaya",
      "Integré SheetJS para extracción de datos de Excel y VictoryChart para visualización gráfica",
      "Mejoré la rapidez en el análisis de tendencias operativas de la planta",
    ],
    metric: "30% mejora en rapidez de análisis de tendencias",
    tech: ["React", "SheetJS", "VictoryChart", "JavaScript"],
  },
];

// Portfolio Projects
export const PROJECTS = [
  {
    title: "Urban Style - E-Commerce Platform",
    description:
      "Plataforma de e-commerce completa con arquitectura hexagonal, gestión de productos, autenticación JWT, carrito de compras y optimización de imágenes con CDN.",
    learning: [
      "Arquitectura hexagonal con Spring Boot para escalabilidad",
      "Optimización de rendimiento mediante conversión de imágenes a WebP",
      "Integración de Cloudflare R2 para almacenamiento y distribución eficiente",
    ],
    tech: [
      "Spring Boot",
      "Astro",
      "React",
      "JWT",
      "Gradle",
      "Docker",
      "Cloudflare R2",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/JuniorCorzo",
    caseStudyUrl: "#",
  },
  {
    title: "DAYEN - Trazabilidad Agroindustrial",
    description:
      "Sistema de trazabilidad para siembra de arroz con API REST escalable, autenticación segura y despliegue en producción con gestión de dominio personalizado.",
    learning: [
      "Diseño de API REST siguiendo patrón MVC",
      "Implementación de seguridad con Spring Security y JWT",
      "Despliegue en VPS con configuración de dominio y CDN",
    ],
    tech: [
      "Spring Boot",
      "Spring Security",
      "JWT",
      "MySQL",
      "JavaScript",
      "Bootstrap 5",
      "DataTables",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/JuniorCorzo",
    caseStudyUrl: "#",
  },
  {
    title: "Instruments Management - Microservices",
    description:
      "Sistema de gestión de instrumentos con arquitectura de microservicios, trazabilidad completa y UI moderna con gestión de estado centralizada.",
    learning: [
      "Arquitectura de microservicios con Spring Boot y NestJS",
      "Gestión de estado con Redux en aplicaciones React",
      "Integración de MongoDB para trazabilidad de datos",
    ],
    tech: ["Spring Boot", "NestJS", "React", "Redux", "Axios", "MongoDB"],
    demoUrl: "#",
    githubUrl: "https://github.com/JuniorCorzo",
    caseStudyUrl: "#",
  },
  {
    title: "Factus Dependency - Java Library",
    description:
      "Librería Java para facturación electrónica con integración a la DIAN colombiana, diseñada con arquitectura modular y procesamiento multihilo para alto rendimiento.",
    learning: [
      "Desarrollo de librerías reutilizables en Java",
      "Arquitectura modular para facilitar mantenimiento",
      "Optimización con multihilos para procesamiento concurrente",
    ],
    tech: ["Java", "Gradle", "Multithreading", "API DIAN"],
    demoUrl: "#",
    githubUrl: "https://github.com/JuniorCorzo",
    caseStudyUrl: "#",
  },
];

// Social Links
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/JuniorCorzo",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/angel-corzo",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:josedanielmmf@gmail.com",
    icon: "email",
  },
];
