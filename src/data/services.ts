// Services — mapped from PRINCIPLES with business-landing structure
export interface Service {
  slug: string;
  icon: string;
  title: string;
  description: string;
  tech: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "desarrollo-full-stack",
    icon: "lucide:layout-grid",
    title: "Desarrollo Full Stack en Colombia",
    description:
      "Desarrollo de aplicaciones web y plataformas a medida en Colombia: frontend React/Astro, backend robusto y despliegue cloud optimizado para negocios.",
    tech: ["Angular", "React", "Node.js", "PostgreSQL", "Astro"],
  },
  {
    slug: "desarrollo-backend",
    icon: "lucide:server",
    title: "Desarrollo Backend y APIs en Colombia",
    description:
      "Arquitectura de backend empresarial y APIs de alto rendimiento en Colombia: Java, Spring Boot, microservicios y bases de datos escalables para empresas.",
    tech: ["Java", "NestJS", "AWS"],
  },
  {
    slug: "consultorias",
    icon: "lucide:compass",
    title: "Consultoría de Software y Arquitectura",
    description:
      "Consultoría técnica en Colombia: auditoría de arquitectura de software, migración a microservicios, optimización de rendimiento y buenas prácticas OWASP.",
    tech: ["Arquitectura", "Performance", "Auditoría"],
  },
  {
    slug: "agentes-ia",
    icon: "lucide:sparkles",
    title: "Desarrollo de Agentes de IA en Colombia",
    description:
      "Implementación de agentes de IA y flujos inteligentes en Colombia: soluciones con LLMs, arquitecturas RAG y automatización de procesos para negocios.",
    tech: ["LLMs", "RAG"],
  },
];
