import Link from "next/link";
import type { Entry } from "@/lib/content";
import { caseThumb } from "@/lib/content.server";
import { href, t, type Locale } from "@/lib/i18n";
import { ImgSlot } from "./ImgSlot";

function chipFor(entry: Entry, locale: Locale) {
  return entry.type === "caso" ? (
    <span className="chip">{t(locale, "common.caseChip")}</span>
  ) : (
    <span className="chip chip--ink">{t(locale, "common.articleChip")}</span>
  );
}

function thumbFor(entry: Entry, locale: Locale) {
  if (entry.type === "articulo") return <ImgSlot src={entry.thumb} alt={entry.alt} spec="" />;
  const label = locale === "en" && entry.chart.labelEn ? entry.chart.labelEn : entry.chart.label;
  const chip = locale === "en" && entry.chipEn ? entry.chipEn : entry.chip;
  return (
    <ImgSlot
      src={caseThumb(entry.id)}
      alt={`${chip} · ${label}`}
      spec={`Miniatura vertical 386×437 (mín. 1160×1350): ${chip} · ${label}`}
    />
  );
}

/** Tarjeta de la parrilla de Insights. */
export function EntryCard({ entry, locale }: { entry: Entry; locale: Locale }) {
  const url = href(locale, `/insights/${entry.id}`);
  const title = entry.type === "caso" ? (locale === "en" && entry.slideTitleEn ? entry.slideTitleEn : entry.slideTitle) : entry.cardTitle;
  const chip = entry.type === "caso" ? (locale === "en" && entry.chipEn ? entry.chipEn : entry.chip) : null;
  return (
    <Link href={url} className="card" data-type={entry.type}>
      <div className="card__thumb">{thumbFor(entry, locale)}</div>
      <div className="card__body">
        <div className="card__meta label">
          {chipFor(entry, locale)}
          {chip && <span className="muted">{chip}</span>}
          <span className="muted">
            {entry.min} {t(locale, "common.minRead")}
          </span>
        </div>
        <h3 className="display display--h3-card">{title}</h3>
        <p className="card__excerpt">{entry.excerpt}</p>
        <span className="card__link label">
          {entry.type === "caso" ? t(locale, "common.readCase") : t(locale, "common.readArticle")}
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}

/** Tarjeta compacta de "Sigue leyendo". */
export function EntryRow({ entry, locale }: { entry: Entry; locale: Locale }) {
  const url = href(locale, `/insights/${entry.id}`);
  const title = entry.type === "caso" ? (locale === "en" && entry.slideTitleEn ? entry.slideTitleEn : entry.slideTitle) : entry.cardTitle;
  return (
    <Link href={url} className="row-card">
      <div className="row-card__thumb">{thumbFor(entry, locale)}</div>
      <div className="stack min0" style={{ gap: 10 }}>
        <div className="label" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {chipFor(entry, locale)}
          <span className="muted">
            {entry.min} {t(locale, "common.minRead")}
          </span>
        </div>
        <span className="display" style={{ fontSize: "clamp(18px,1.7vw,26px)" }}>
          {title}
        </span>
      </div>
    </Link>
  );
}
