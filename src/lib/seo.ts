import type { Metadata } from "next";
import { href, SITE, type Locale } from "./i18n";

/** Metadatos con canonical y hreflang para las dos versiones de idioma. */
export function pageMeta(locale: Locale, path: string, title: string, description: string, extra?: Partial<Metadata>): Metadata {
  const es = href("es", path);
  const en = href("en", path);
  return {
    title,
    description,
    alternates: {
      canonical: href(locale, path),
      languages: { es, en, "x-default": es },
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${href(locale, path)}`,
      locale: locale === "es" ? "es_CO" : "en_US",
      siteName: SITE.name,
      type: "website",
    },
    ...extra,
  };
}

export const PATHS = [
  "/",
  "/servicios",
  "/quienes-somos",
  "/insights",
  "/contacto",
  "/politica-de-privacidad",
  "/politica-de-cookies",
  "/terminos-de-uso",
] as const;
