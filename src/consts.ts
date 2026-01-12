// Portfolio SEO Configuration - Angel Corzo
export const SITE_TITLE =
  "Angel Corzo - Desarrollador Full Stack Cúcuta | Backend Java Spring Boot & React";
export const SITE_DESCRIPTION =
  "Desarrollador Full Stack en Cúcuta con experiencia en Ecopetrol. Especialista en arquitectura de microservicios, Spring Boot, Java, React y APIs RESTful. Proyectos agroindustriales y e-commerce con resultados medibles. Disponible para freelance remoto.";

// Developer Information
export const DEVELOPER_NAME = "Angel Corzo";
export const DEVELOPER_ROLE = "Desarrollador Full Stack Backend";
export const DEVELOPER_EMAIL = "contact@angelcorzo.dev";
export const DEVELOPER_LOCATION = "Cúcuta, Norte de Santander, Colombia";
export const DEVELOPER_AVAILABILITY = "Disponible para proyectos remotos";
export const DEVELOPER_CV = "https://files.angelcorzo.dev/CV_Angel_Corzo.pdf";

// Hero Section - Optimized for Search Intent
export const HERO_HEADLINE_1 = "Full Stack en Cúcuta";
export const HERO_HEADLINE_2 =
  "Especialista en Backend Java & Arquitectura de Microservicios";
export const HERO_DESCRIPTION =
  "Transformo ideas complejas en soluciones digitales escalables utilizando Spring Boot, React y arquitectura hexagonal. Con experiencia comprobada en Ecopetrol optimizando análisis de datos operativos, diseño APIs RESTful robustas, sistemas de trazabilidad agroindustrial y plataformas e-commerce de alto rendimiento. Enfoque meticuloso en código limpio, testing automatizado y Core Web Vitals para aplicaciones que crecen con tu negocio.";
export const HERO_IMAGE = "/images/angel-corzo-desarrollador-cucuta.webp";

export const HERO_CHIPS = [
  {
    title: "Cúcuta, Colombia",
    icon: "lucide:map-pin",
    background: "--blue-rgb",
    color: "--blue-dark",
  },
  {
    title: "Java • Spring Boot • React",
    icon: "lucide:code",
    background: "--green-rgb",
    color: "--green-dark",
  },
  {
    title: "Arquitectura Hexagonal & Microservicios",
    icon: "lucide:layers",
    background: "--purple-rgb",
    color: "--purple-dark",
  },
  {
    title: "Certificado SENA",
    icon: "lucide:award",
    background: "--orange-rgb",
    color: "--orange-dark",
  },
];

// Development Principles - Enhanced with Technical SEO Terms
export const PRINCIPLES = [
  {
    icon: "lucide:server",
    title: "Arquitectura Escalable con Microservicios",
    description:
      "Diseño sistemas empresariales pensados para crecer utilizando arquitectura hexagonal y patrón MVC. Desde modelado de bases de datos relacionales (PostgreSQL, MySQL) hasta módulos React desacoplados, cada componente sigue principios SOLID para mantenibilidad a largo plazo y testing automatizado con JUnit.",
  },
  {
    icon: "lucide:brush",
    title: "Diseño UI/UX Pixel Perfect con Frontend Moderno",
    description:
      "Implemento diseños responsivos que respetan la visión creativa original utilizando Tailwind CSS y TypeScript. Cuido micro-interacciones, accesibilidad WCAG, y gestión de estado con Redux para experiencias fluidas en todos los dispositivos.",
  },
  {
    icon: "lucide:gauge",
    title: "Optimización de Rendimiento Web",
    description:
      "Priorizo Core Web Vitals con técnicas como lazy loading, conversión a WebP, CDN (Cloudflare R2), y code splitting. Resultado: tiempos de carga <2s y mejoras del 30% en métricas de análisis de datos (caso Ecopetrol).",
  },
  {
    icon: "lucide:shield-check",
    title: "Seguridad y Autenticación Empresarial",
    description:
      "Implemento autenticación JWT con Spring Security, validación de datos robusta y mejores prácticas OWASP. Experiencia con integración DIAN para facturación electrónica cumpliendo normativas colombianas.",
  },
];

// Skills - Organized by Expertise Level
export const SKILLS = {
  backend: [
    { title: "Java 17+", icon: "simple-icons:openjdk", level: "Avanzado" },
    {
      title: "Spring Boot",
      icon: "simple-icons:springboot",
      level: "Avanzado",
    },
    {
      title: "Spring Security",
      icon: "simple-icons:springsecurity",
      level: "Intermedio",
    },
    { title: "PostgreSQL", icon: "simple-icons:postgresql", level: "Avanzado" },
    { title: "MongoDB", icon: "simple-icons:mongodb", level: "Intermedio" },
    { title: "MySQL", icon: "simple-icons:mysql", level: "Avanzado" },
  ],
  frontend: [
    { title: "React", icon: "simple-icons:react", level: "Avanzado" },
    { title: "TypeScript", icon: "simple-icons:typescript", level: "Avanzado" },
    { title: "Astro", icon: "simple-icons:astro", level: "Intermedio" },
    {
      title: "Tailwind CSS",
      icon: "simple-icons:tailwindcss",
      level: "Avanzado",
    },
    { title: "Redux", icon: "simple-icons:redux", level: "Intermedio" },
    { title: "HTML5/CSS3", icon: "simple-icons:html5", level: "Avanzado" },
  ],
  devops: [
    { title: "Docker", icon: "simple-icons:docker", level: "Intermedio" },
    { title: "Git", icon: "simple-icons:git", level: "Avanzado" },
    { title: "Gradle", icon: "simple-icons:gradle", level: "Intermedio" },
  ],
  testing: [
    { title: "JUnit 5", icon: "simple-icons:junit5", level: "Intermedio" },
  ],
};

// Experience Timeline - Enhanced with SEO Keywords
export const EXPERIENCE = [
  {
    period: "Abril 2024 - Octubre 2024",
    title: "Aprendiz Desarrollador Full Stack",
    company: "Ecopetrol S.A.",
    location: "Cúcuta, Colombia",
    type: "Práctica Profesional SENA",
    highlights: [
      "Desarrollé aplicación web React para visualización de datos operativos de la planta de gas Oripaya, procesando datasets Excel complejos",
      "Integré SheetJS para extracción y transformación de datos + VictoryChart para dashboards interactivos con filtros dinámicos",
      "Implementé TypeScript para type safety y reducción de errores en producción",
      "Logré 30% de mejora en rapidez de análisis de tendencias operativas mediante automatización de reportes manuales",
    ],
    metric:
      "30% reducción en tiempo de análisis | 15+ dashboards implementados",
    tech: [
      "React",
      "TypeScript",
      "SheetJS",
      "VictoryChart",
      "Data Visualization",
    ],
    sector: "Petróleo y Gas",
  },
];

// Portfolio Projects - Optimized with LSI Keywords
export const PROJECTS = [
  {
    title: "Urban Style - Plataforma E-Commerce Escalable",
    description:
      "Sistema completo de comercio electrónico con arquitectura hexagonal backend en Spring Boot, frontend Astro/React, autenticación JWT, gestión de inventario, carrito de compras persistente y optimización de imágenes con CDN Cloudflare R2. Integración con pasarelas de pago y panel administrativo para gestión de productos.",
    challenge:
      "Reducir tiempos de carga en catálogo con 500+ productos manteniendo calidad visual",
    solution:
      "Conversión automática a WebP, lazy loading y CDN con edge caching",
    learning: [
      "Arquitectura hexagonal con Spring Boot para separación de responsabilidades y escalabilidad horizontal",
      "Optimización de rendimiento: conversión batch a WebP redujo peso de imágenes 70%",
      "Integración Cloudflare R2 para distribución global con latencias <100ms",
      "Testing de integración con JUnit para endpoints críticos de checkout",
    ],
    results: "PageSpeed score 95+ | Tiempo de carga <1.8s",
    tech: [
      "Spring Boot",
      "Astro",
      "React",
      "JWT",
      "Gradle",
      "Docker",
      "Cloudflare R2",
      "MongoDB",
    ],
    githubUrl: "https://github.com/JuniorCorzo/UrbanStyle",
    caseStudyUrl: "/proyectos/urban-style-ecommerce",
  },
  {
    title: "DAYEN - Sistema de Trazabilidad Agroindustrial",
    description:
      "Plataforma de trazabilidad completa para cultivos de arroz con API REST escalable, autenticación Spring Security + JWT, gestión de ciclos de siembra, control de insumos y generación de reportes. Desplegado en VPS con dominio personalizado y SSL.",
    challenge:
      "Diseñar sistema que rastreé lotes de arroz desde siembra hasta cosecha para auditorías",
    solution:
      "API REST con endpoints versionados y base de datos relacional normalizada",
    learning: [
      "Diseño de API RESTful siguiendo convenciones REST y versionado semántico",
      "Implementación de seguridad con Spring Security: roles, permisos y tokens JWT con refresh",
      "Despliegue en VPS Linux: configuración Nginx, dominio personalizado, certificado Let's Encrypt",
      "Integración DataTables para UI responsiva con paginación server-side",
    ],
    results: "100% trazabilidad de lotes | 0 downtime en 6 meses",
    tech: [
      "Spring Boot",
      "Spring Security",
      "JWT",
      "MySQL",
      "JavaScript",
      "Bootstrap 5",
      "DataTables",
      "Nginx",
    ],
    githubUrl: "https://github.com/JuniorCorzo/Dayen",
    caseStudyUrl: "/proyectos/dayen-trazabilidad",
    sector: "Agroindustria",
  },
  {
    title: "Instruments Management - Arquitectura de Microservicios",
    description:
      "Sistema modular para gestión de instrumentos médicos/industriales con arquitectura de microservicios (Spring Boot + NestJS), trazabilidad de calibraciones, frontend React con Redux para estado global y persistencia MongoDB para logs de auditoría.",
    challenge:
      "Crear sistema distribuido donde cada módulo escale independientemente",
    solution:
      "Microservicios comunicados vía REST con MongoDB para datos no estructurados",
    learning: [
      "Arquitectura de microservicios: servicios independientes con responsabilidad única",
      "Gestión de estado complejo en React con Redux y middleware Thunk para llamadas asíncronas",
      "Integración MongoDB para almacenar historial de calibraciones con consultas agregadas",
      "Comunicación inter-servicios con Axios y manejo robusto de errores",
    ],
    results: "3 microservicios independientes | 99.5% uptime",
    tech: [
      "Spring Boot",
      "NestJS",
      "React",
      "Redux",
      "Axios",
      "MongoDB",
      "Docker",
    ],
    githubUrl: "https://github.com/JuniorCorzo/InstrumentsManage",
    caseStudyUrl: "/proyectos/instruments-microservices",
  },
  {
    title:
      "Factus Dependency - Librería Java para Facturación Electrónica DIAN",
    description:
      "Librería Java modular para integración con la DIAN colombiana (facturación electrónica), diseñada con arquitectura de plugins, procesamiento multihilo para generación masiva de facturas y validación de esquemas XML/UBL según normativa colombiana.",
    challenge:
      "Procesar lotes de 1000+ facturas sin bloquear aplicación principal",
    solution: "ExecutorService con thread pools y procesamiento asíncrono",
    learning: [
      "Desarrollo de librerías Java reutilizables con Gradle para distribución vía Maven Central",
      "Arquitectura modular con SPI (Service Provider Interface) para extensibilidad",
      "Optimización multihilo: ExecutorService con pools configurables redujo tiempo de procesamiento 60%",
      "Validación XML contra esquemas XSD de la DIAN con manejo granular de errores",
    ],
    results: "60% reducción en tiempo de procesamiento | Publicada en Maven",
    tech: ["Java", "Gradle", "Multithreading", "XML/UBL", "API DIAN"],
    githubUrl: "https://github.com/JuniorCorzo/FactusDependency",
    caseStudyUrl: "/proyectos/factus-dependency-dian",
    sector: "Fintech / Compliance",
  },
];

// Contact & CTA - Optimized for Conversions
export const CONTACT_DETAILS = {
  email: {
    title: "Contacto Directo",
    icon: "simple-icons:gmail",
    mail: DEVELOPER_EMAIL,
    cta: "Solicita consultoría técnica gratuita",
  },
  ubication: {
    title: "Ubicación",
    icon: "lucide:map-pin",
    text: "Cúcuta, Norte de Santander, Colombia",
    remote: "Disponible para proyectos remotos en LATAM",
  },
  social: {
    title: "Portafolio & Redes Profesionales",
    icon: "lucide:share-2",
    content: [
      {
        name: "GitHub",
        subtitle: "5+ proyectos open source",
        url: "https://github.com/JuniorCorzo",
        icon: "simple-icons:github",
        color: "#FFFFFF",
      },
      {
        name: "LinkedIn",
        subtitle: "Experiencia profesional",
        url: "https://linkedin.com/in/angel-corzo",
        icon: "simple-icons:linkedin",
        color: "#0077B5",
      },
    ],
  },
  cta_primary: {
    text: "Descargar CV Completo (PDF)",
    url: DEVELOPER_CV,
    type: "download",
  },
  cta_secondary: {
    text: "Ver Casos de Estudio Detallados",
    url: "/proyectos",
    type: "internal",
  },
};

// FAQ Schema for Featured Snippets
export const FAQ_SCHEMA = [
  {
    question: "¿Qué es arquitectura hexagonal y por qué usarla?",
    answer:
      "La arquitectura hexagonal separa la lógica de negocio de frameworks externos, facilitando testing, mantenibilidad y cambios de tecnología sin reescribir código core. Ideal para aplicaciones empresariales escalables.",
  },
  {
    question: "¿Cuánto tiempo toma desarrollar un e-commerce con Spring Boot?",
    answer:
      "Un MVP funcional con carrito, autenticación y pagos toma 6-8 semanas. Proyectos complejos con microservicios y análisis de datos pueden extenderse 3-4 meses.",
  },
  {
    question: "¿Trabajas con empresas fuera de Cúcuta?",
    answer:
      "Sí, trabajo 100% remoto con clientes en toda Colombia y Latinoamérica. Experiencia previa con Ecopetrol y proyectos distribuidos.",
  },
];
