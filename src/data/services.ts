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
    title: "Desarrollo Full Stack",
    description:
      "Aplicaciones web completas con arquitectura moderna: React, Node.js, bases de datos SQL/NoSQL, APIs REST y GraphQL. Del concepto al deploy.",
    tech: ["Angular", "React", "Node.js", "PostgreSQL", "Astro"],
  },
  {
    slug: "desarrollo-backend",
    icon: "lucide:server",
    title: "Desarrollo Backend",
    description:
      "Servicios robustos y escalables: microservicios, APIs de alto rendimiento, optimización de consultas y arquitectura cloud-native.",
    tech: ["Java", "NestJS", "AWS"],
  },
  {
    slug: "consultorias",
    icon: "lucide:compass",
    title: "Consultorías Técnicas",
    description:
      "Revisión de arquitectura, optimización de performance, elección de stack tecnológico y mentorías para equipos de desarrollo.",
    tech: ["Arquitectura", "Performance", "Auditoría"],
  },
  {
    slug: "agentes-ia",
    icon: "lucide:sparkles",
    title: "Agentes de IA",
    description:
      "Desarrollo de agentes inteligentes con LLMs, RAG, automatización de flujos de trabajo e integración con APIs de inteligencia artificial.",
    tech: ["LLMs", "RAG"],
  },
];
