import casosJson from "../../content/casos.json";
import { articulos } from "../../content/articulos";
import type { Locale } from "./i18n";

/* ============================================================
   Tipos de contenido: `caso` y `articulo`.
   Los casos viven en content/casos.json (fuente de verdad de cifras).
   Los artículos viven en content/articulos/*.ts como bloques.
   ============================================================ */

export type SectorKey = "educacion" | "edtech" | "insurtech" | "banca" | "medios";

export type Metric = {
  d: string; // texto a mostrar
  n?: string; // valor numérico para el contador
  dec?: string;
  pre?: string;
  suf?: string;
  l: string;
  lEn?: string;
};

export type Chart = {
  label: string;
  labelEn?: string;
  a: number;
  b: number;
  aLabel: string;
  aLabelEn?: string;
  bLabel: string;
  bLabelEn?: string;
  aDisplay?: string;
  bDisplay?: string;
};

export type Caso = {
  type: "caso";
  id: string;
  sector: SectorKey;
  chip: string;
  chipEn?: string;
  min: number;
  eyebrow: string;
  eyebrowEn?: string;
  slideTitle: string;
  slideTitleEn?: string;
  title: string;
  narrativa: string;
  narrativaEn?: string;
  bajada: string;
  excerpt: string;
  chart: Chart;
  metrics: Metric[];
  reto: string[];
  hicimos: string[];
  resultados: string;
  nota?: string;
  notaEn?: string;
  quote: string;
  porque: string;
  seo: { title: string; description: string };
};

export type ArticleBlock =
  | { type: "p"; html: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "callout"; label: string; html: string }
  | { type: "figure"; slot: string; alt: string; caption: string; src?: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cta"; label: string; text: string };

export type Articulo = {
  type: "articulo";
  id: string;
  topic: string;
  min: number;
  title: string; // título completo (h1)
  cardTitle: string; // título corto para tarjetas
  excerpt: string;
  published: string;
  updated: string;
  thumb: string;
  banner: string;
  bannerBg: string;
  alt: string;
  seo: { title: string; description: string };
  blocks: ArticleBlock[];
};

export type Entry = Caso | Articulo;

/* ---------- SEO por caso (contenido/casos-y-slider.md, Parte 2) ---------- */
const CASE_SEO: Record<string, { title: string; description: string }> = {
  "crecimiento-sostenido-matriculas-universidad": {
    title: "Cómo una universidad volvió el crecimiento un sistema",
    description:
      "Marketing y ventas integrados durante cuatro años: +48% en población activa, +44% en matrículas y +53% en ingresos netos. Un motor de crecimiento sostenido.",
  },
  "estrategia-comercial-b2b-recurrencia-edtech": {
    title: "Estrategia comercial B2B: un pipeline difícil de perder",
    description:
      "Expansión de cuentas, renovaciones y upselling en LATAM: +58% en MRR, +88% en revenue Enterprise y +12 pp de NDR. Cómo el pipeline se vuelve recurrente.",
  },
  "insurtech-break-even-a-margen-positivo": {
    title: "De break-even a margen positivo en una insurtech",
    description:
      "Rediseño comercial y operativo en una insurtech: +65% en ventas, +43% de productividad por agente y una operación que pasó de equilibrio a margen positivo.",
  },
  "insourcing-ventas-productividad-edtech": {
    title: "Insourcing de ventas: menos equipo, más productividad",
    description:
      "Tras internalizar las campañas de ventas, la operación quedó con un tercio del equipo y multiplicó la productividad por agente +282%, con +19% en conversión.",
  },
  "modelo-de-ventas-contact-center-banca": {
    title: "Un solo modelo de venta para 11 campañas de banca",
    description:
      "Reestructuración de ventas y retención en banca: +82% en tarjetas activas, +35% de productividad por agente y colocación acelerada, con cumplimiento regulatorio.",
  },
  "optimizacion-bpo-comercial-medios": {
    title: "25% menos equipo, cumplimiento de 79% a 96%",
    description:
      "Rediseño del modelo operativo en medios: cumplimiento de ventas de 79% a 96% con 25% menos equipo, +$4.000M en ventas anuales y 9 campañas bajo un modelo.",
  },
  "universidad-recupera-control-motor-comercial": {
    title: "Una universidad recuperó el control de su motor comercial",
    description:
      "+16% en matrículas en un semestre y un motor de mercadeo operando in-house, sin depender de agencia. CRM, pauta interna y reporting propios.",
  },
};

/** Los 7 casos, en el orden del slider (fuente: casos.json). */
export const casos: Caso[] = (casosJson as Omit<Caso, "type" | "seo">[]).map((c) => ({
  ...c,
  type: "caso",
  seo: CASE_SEO[c.id] ?? { title: c.title, description: c.excerpt },
}));

export function getCaso(id: string): Caso | undefined {
  return casos.find((c) => c.id === id);
}
export function getArticulo(id: string): Articulo | undefined {
  return articulos.find((a) => a.id === id);
}
export function getEntry(id: string): Entry | undefined {
  return getCaso(id) ?? getArticulo(id);
}

/**
 * Orden de la parrilla de Insights (handoff §5.2):
 * caso, caso, artículo, caso, caso, artículo, caso, caso, caso.
 * Cada entrada nueva se suma aquí.
 */
export const INSIGHTS_ORDER: string[] = [
  "insourcing-ventas-productividad-edtech",
  "universidad-recupera-control-motor-comercial",
  "por-que-mi-empresa-no-crece",
  "modelo-de-ventas-contact-center-banca",
  "insurtech-break-even-a-margen-positivo",
  "leads-pero-no-ventas",
  "crecimiento-sostenido-matriculas-universidad",
  "estrategia-comercial-b2b-recurrencia-edtech",
  "optimizacion-bpo-comercial-medios",
];

export const insightsIndex: Entry[] = INSIGHTS_ORDER.map((id) => {
  const e = getEntry(id);
  if (!e) throw new Error(`Entrada de Insights no encontrada: ${id}`);
  return e;
});

/** "Sigue leyendo": el caso siguiente en el slider + un artículo. */
export function relatedFor(entry: Entry): Entry[] {
  if (entry.type === "caso") {
    const i = casos.findIndex((c) => c.id === entry.id);
    const next = casos[(i + 1) % casos.length];
    const art = articulos[i % articulos.length];
    return [next, art];
  }
  const i = articulos.findIndex((a) => a.id === entry.id);
  const otherArt = articulos[(i + 1) % articulos.length];
  const caso = getCaso("universidad-recupera-control-motor-comercial")!;
  return [otherArt, caso];
}

/* ---------- Sectores (chips del slider) ---------- */
export const SECTORS: { key: SectorKey | "todos"; es: string; en: string }[] = [
  { key: "todos", es: "Todos", en: "All" },
  { key: "educacion", es: "Educación superior", en: "Higher education" },
  { key: "edtech", es: "EdTech", en: "Edtech" },
  { key: "insurtech", es: "Insurtech", en: "Insurtech" },
  { key: "banca", es: "Banca", en: "Banking" },
  { key: "medios", es: "Medios", en: "Media" },
];

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ---------- helpers de localización de contenido ---------- */
export function loc<T extends Record<string, unknown>>(obj: T, key: string, locale: Locale): string {
  const en = obj[`${key}En`];
  const es = obj[key];
  return (locale === "en" && typeof en === "string" && en) || (es as string) || "";
}
