import "server-only";
import fs from "node:fs";
import path from "node:path";
import { slugifyHeading } from "./content";

/* Helpers que tocan el sistema de archivos: solo para Server Components. */

/* ---------- Imágenes de caso (pendientes de entrega, handoff §9) ---------- */
const CASE_IMG_DIR = path.join(process.cwd(), "public", "images", "casos");
function caseImage(kind: "thumb" | "hero", id: string): string | undefined {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const file = `${id}-${kind}.${ext}`;
    if (fs.existsSync(path.join(CASE_IMG_DIR, file))) return `/images/casos/${file}`;
  }
  return undefined;
}
export function caseThumb(id: string) {
  return caseImage("thumb", id);
}
export function caseHero(id: string) {
  return caseImage("hero", id);
}

/* ---------- Legales (Markdown editable en content/legal) ---------- */
export type LegalDoc = {
  slug: "politica-de-privacidad" | "politica-de-cookies" | "terminos-de-uso";
  title: string;
  titleEn: string;
  effective: string;
  version: string;
  body: string; // markdown sin el encabezado
  toc: { id: string; text: string }[];
};

const LEGAL_META: Record<LegalDoc["slug"], { titleEn: string }> = {
  "politica-de-privacidad": { titleEn: "Personal Data Processing Policy" },
  "politica-de-cookies": { titleEn: "Cookie Policy" },
  "terminos-de-uso": { titleEn: "Terms of Use" },
};


export function getLegal(slug: LegalDoc["slug"]): LegalDoc {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "legal", `${slug}.md`), "utf8");
  const title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug;
  const effective = raw.match(/^Vigente desde:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const version = raw.match(/^Versión\s+(.+)$/m)?.[1]?.trim() ?? "";
  // El cuerpo empieza después del primer separador `---`.
  const idx = raw.indexOf("\n---");
  const body = idx >= 0 ? raw.slice(idx + 4).trim() : raw;
  const toc = Array.from(body.matchAll(/^##\s+(.+)$/gm)).map((m) => ({
    id: slugifyHeading(m[1]),
    text: m[1].trim(),
  }));
  return { slug, title, titleEn: LEGAL_META[slug].titleEn, effective, version, body, toc };
}

