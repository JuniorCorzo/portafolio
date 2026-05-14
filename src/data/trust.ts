// Trust signals — testimonials, credentials, metrics
// TODO: replace placeholder testimonials with real client reviews once available.
// The quotes below are fictional and serve only as layout scaffolding.

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  // Pending: populate with real client reviews once available.
];

export const CREDENTIALS = [
  { label: "Tecnólogo en Análisis y Desarrollo de Software", issuer: "SENA" },
  { label: "Práctica Profesional", issuer: "Ecopetrol S.A." },
];

export const METRICS = [
  { value: "3+", label: "Años de experiencia" },
  { value: "0", label: "Proyectos públicos" },
  { value: "100%", label: "Compromiso con la calidad" },
  { value: "24h", label: "Tiempo de respuesta" },
];
