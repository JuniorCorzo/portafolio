// Contact & conversion data
// Env vars (prefix with PUBLIC_ so Astro exposes them to the client):
//   PUBLIC_WHATSAPP_NUMBER=573XXXXXXXXX
//   PUBLIC_CALENDLY_URL=https://calendly.com/...
export const CONTACT_EMAIL = "contact@angelcorzo.dev";
export const CONTACT_LOCATION = "Cúcuta, Norte de Santander, Colombia";
export const CONTACT_REMOTE = "Disponible para proyectos remotos en LATAM";

export const WHATSAPP_NUMBER = "573142467659";
export const WHATSAPP_MESSAGE =
  "Hola Angel, vi tu portafolio y me interesa contratar tus servicios de desarrollo.";

export const CALENDLY_URL = import.meta.env.PUBLIC_CALENDLY_URL || ""; // TODO: add real Calendly URL when available
export const RESPONSE_TIME = "<24h";

export const SOCIAL_LINKS = [
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
];
