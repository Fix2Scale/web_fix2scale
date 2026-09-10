export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** Construye una URL pública: el español no lleva prefijo, el inglés va bajo /en. */
export function href(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "es") return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

/** Devuelve el mismo path en el otro idioma (para el conmutador). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return href(to, stripped);
}

/** Texto localizado: `pick(locale, es, en)`. Si falta el inglés, cae al español. */
export function pick(locale: Locale, es: string, en?: string): string {
  return locale === "en" && en ? en : es;
}

export const SITE = {
  name: "Fix 2 Scale",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fix2scale.com",
  email: "info@fix2scale.com",
  calendar: "https://cal.com/felipe-jimenez/fix-2-scale-discovery-call",
  legalName: "Fix 2 Scale SAS",
  nit: "901.863.581-9",
  address: "Carrera 16 A No. 135-84, Oficina 506, Bogotá D.C., Colombia",
  /** Versión del texto de política aceptado en el formulario (Ley 1581 de 2012). */
  privacyPolicyVersion: "1.0 · 2026-09-01",
};

/* ---------- Diccionario de chrome y strings cortos ---------- */
const dict = {
  nav: {
    home: ["Inicio", "Home"],
    services: ["Servicios", "Services"],
    about: ["Quiénes Somos", "About Us"],
    insights: ["Insights", "Insights"],
    contact: ["Contacto", "Contact"],
    cta: ["Agenda un diagnóstico", "Book a discovery call"],
    menu: ["Menú", "Menu"],
    close: ["Cerrar menú", "Close menu"],
  },
  footer: {
    site: ["Sitio", "Site"],
    insights: ["Insights y Recursos", "Insights and Resources"],
    contact: ["Contacto", "Contact"],
    legal: ["Legal", "Legal"],
    privacy: ["Política de Privacidad", "Privacy Policy"],
    cookies: ["Política de Cookies", "Cookie Policy"],
    terms: ["Términos de Uso", "Terms of Use"],
    cookiePrefs: ["Preferencias de cookies", "Cookie preferences"],
    city: ["Bogotá, Colombia", "Bogotá, Colombia"],
  },
  cta: {
    title: ["¿Sabes qué está limitando tu crecimiento?", "Do you know what is limiting your growth?"],
    body: [
      "Empecemos por un diagnóstico. Identificamos la restricción real y construimos el sistema para superarla.",
      "Let us start with a diagnosis. We identify the real constraint and build the system to get past it.",
    ],
    button: ["Agenda un diagnóstico", "Book a discovery call"],
  },
  common: {
    caseChip: ["Caso de éxito", "Success story"],
    articleChip: ["Artículo", "Article"],
    minRead: ["min de lectura", "min read"],
    readCase: ["Leer el caso", "Read the case"],
    readArticle: ["Leer el artículo", "Read the article"],
    seeFullCase: ["Ver el caso completo", "See the full case"],
    keepReading: ["Sigue leyendo", "Keep reading"],
    before: ["Antes", "Before"],
    after: ["Después", "After"],
    detail: ["Detalle", "Detail"],
    projection: ["Proyección · cifra por confirmar", "Projection · figure to be confirmed"],
    challenge: ["El reto", "The challenge"],
    whatWeDid: ["Qué hicimos", "What we did"],
    results: ["Los resultados", "The results"],
    whyItMatters: ["Por qué importa", "Why it matters"],
    insightsBack: ["Insights y Recursos", "Insights and Resources"],
    inThisArticle: ["En este artículo", "In this article"],
    contents: ["Contenido", "Contents"],
    otherDocs: ["Otros documentos", "Other documents"],
    esOnly: [
      "Este contenido está disponible por ahora solo en español.",
      "This content is currently available in Spanish only.",
    ],
    nextStep: ["Siguiente paso", "Next step"],
  },
  cookies: {
    title: ["Cookies en fix2scale.com", "Cookies on fix2scale.com"],
    body: [
      "Usamos cookies estrictamente necesarias para que el sitio funcione. Las analíticas y publicitarias solo se activan con tu consentimiento. Puedes cambiar tu decisión desde el pie de página.",
      "We use strictly necessary cookies so the site works. Analytics and advertising cookies only run with your consent. You can change your decision from the footer.",
    ],
    acceptAll: ["Aceptar todas", "Accept all"],
    rejectAll: ["Rechazar todas", "Reject all"],
    configure: ["Configurar", "Configure"],
    save: ["Guardar preferencias", "Save preferences"],
    necessary: ["Estrictamente necesarias", "Strictly necessary"],
    necessaryNote: ["Siempre activas", "Always on"],
    analytics: ["Analíticas", "Analytics"],
    ads: ["Publicitarias y de medición", "Advertising and measurement"],
    functional: ["Funcionales de terceros", "Third-party functional"],
    policy: ["Política de Cookies", "Cookie Policy"],
  },
} as const;

type Dict = typeof dict;
export type TKey = { [S in keyof Dict]: `${S & string}.${keyof Dict[S] & string}` }[keyof Dict];

export function t(locale: Locale, key: TKey): string {
  const [section, k] = key.split(".") as [keyof Dict, string];
  const pair = (dict[section] as Record<string, readonly [string, string]>)[k];
  if (!pair) return key;
  return locale === "en" ? pair[1] : pair[0];
}
