import type { MetadataRoute } from "next";
import { insightsIndex } from "@/lib/content";
import { href, SITE } from "@/lib/i18n";
import { PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PATHS, ...insightsIndex.map((e) => `/insights/${e.id}`)];
  return paths.map((p) => ({
    url: `${SITE.url}${href("es", p)}`,
    lastModified: new Date(),
    changeFrequency: p.startsWith("/insights") ? "monthly" : "weekly",
    priority: p === "/" ? 1 : p.startsWith("/insights/") ? 0.7 : p.includes("politica") || p.includes("terminos") ? 0.3 : 0.8,
    alternates: { languages: { es: `${SITE.url}${href("es", p)}`, en: `${SITE.url}${href("en", p)}` } },
  }));
}
