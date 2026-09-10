import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, insightsIndex, relatedFor, type Articulo, type Caso } from "@/lib/content";
import { caseHero } from "@/lib/content.server";
import { href, isLocale, LOCALES, pick, t, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { CtaFinal } from "@/components/CtaFinal";
import { Chart } from "@/components/Chart";
import { Counter } from "@/components/Counter";
import { ImgSlot } from "@/components/ImgSlot";
import { Related } from "@/components/Related";
import { TocNav } from "@/components/TocNav";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => insightsIndex.map((e) => ({ locale, slug: e.id })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const entry = getEntry(slug);
  if (!entry) notFound();
  return pageMeta(locale, `/insights/${slug}`, entry.seo.title, entry.seo.description, {
    openGraph: { type: "article", images: entry.type === "articulo" ? [entry.banner] : undefined },
  });
}

export default async function EntryPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const entry = getEntry(slug);
  if (!entry) notFound();
  return entry.type === "caso" ? <CasoView caso={entry} locale={locale} /> : <ArticuloView art={entry} locale={locale} />;
}

/* ============================================================
   Plantilla de caso de éxito (handoff §5.3)
   ============================================================ */
function CasoView({ caso, locale }: { caso: Caso; locale: Locale }) {
  const chip = locale === "en" && caso.chipEn ? caso.chipEn : caso.chip;
  const eyebrow = locale === "en" && caso.eyebrowEn ? caso.eyebrowEn : caso.eyebrow;
  const label = locale === "en" && caso.chart.labelEn ? caso.chart.labelEn : caso.chart.label;
  const hero = caseHero(caso.id);
  const related = relatedFor(caso);
  const esOnly = locale === "en";

  return (
    <>
      <section className="entry-head">
        <div className="wrap--read stack" style={{ gap: 22 }}>
          <Link href={href(locale, "/insights")} className="link-back label">
            {t(locale, "common.insightsBack")}
          </Link>
          <div className="entry-meta label hero-in">
            <span className="chip">{t(locale, "common.caseChip")}</span>
            <span className="muted">{eyebrow}</span>
            <span className="muted">·</span>
            <span className="muted">
              {caso.min} {t(locale, "common.minRead")}
            </span>
          </div>
          <h1 className="display display--h1-read hero-in" style={{ animationDelay: "95ms" }}>
            {caso.title}
          </h1>
          <p className="entry-bajada hero-in" style={{ animationDelay: "190ms" }}>
            {caso.bajada}
          </p>
          {esOnly && <p className="es-only hero-in" style={{ animationDelay: "285ms" }}>{t(locale, "common.esOnly")}</p>}
        </div>
      </section>

      <section style={{ padding: "0 0 clamp(40px,5vw,80px)" }}>
        <div className="entry-hero">
          <ImgSlot src={hero} alt={`${chip} · ${label}`} spec={`Hero 21:9 full-bleed (mín. 2400×1030): ${chip} · ${label}`} priority />
        </div>
      </section>

      <section className="entry-body">
        <div className="wrap--read stack" style={{ gap: "clamp(24px,2.6vw,40px)" }}>
          <Reveal as="h2" className="display display--h2-read">
            {t(locale, "common.challenge")}
          </Reveal>
          {caso.reto.map((p, i) => (
            <Reveal as="p" key={i} className="body-read">
              {p}
            </Reveal>
          ))}
          <Reveal as="h2" className="display display--h2-read">
            {t(locale, "common.whatWeDid")}
          </Reveal>
          {caso.hicimos.map((p, i) => (
            <Reveal as="p" key={i} className="body-read">
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="results section--dark">
        <div className="wrap stack" style={{ gap: "clamp(34px,3.6vw,60px)" }}>
          <Reveal as="h2" className="display display--h2-read" style={{ color: "var(--f2s-white)", maxWidth: "26ch" }}>
            {t(locale, "common.results")}
          </Reveal>
          <div className="results__grid">
            <Reveal className="min0">
              <Chart chart={caso.chart} locale={locale} size="page" />
            </Reveal>
            <div className="results__metrics">
              {caso.metrics.map((m, i) => (
                <Reveal key={i} delay={i * 110} className="results__metric">
                  <div className="num">
                    {m.n ? <Counter value={parseFloat(m.n)} dec={parseInt(m.dec ?? "0", 10)} prefix={m.pre} suffix={m.suf} locale={locale} /> : m.d}
                  </div>
                  <div className="metric__l">{locale === "en" && m.lEn ? m.lEn : m.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="results__detail">
            <Reveal className="stack min0" style={{ gap: 12 }}>
              <span className="label label--12 muted">{t(locale, "common.detail")}</span>
              <p>{caso.resultados}</p>
            </Reveal>
            {caso.nota && (
              <Reveal delay={110} className="stack min0 results__proj" style={{ gap: 12 }}>
                <span className="label label--12" style={{ color: "var(--f2s-gray-700)" }}>
                  {t(locale, "common.projection")}
                </span>
                <p>{locale === "en" && caso.notaEn ? caso.notaEn : caso.nota}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="section--inner" style={{ paddingBottom: "clamp(48px,6vw,96px)" }}>
        <div className="wrap--read stack" style={{ gap: "clamp(24px,2.6vw,40px)" }}>
          <Reveal as="h2" className="display display--h2-read">
            {t(locale, "common.whyItMatters")}
          </Reveal>
          <Reveal as="blockquote" className="quote">
            “{caso.quote}”
          </Reveal>
          <Reveal as="p" className="body-read">
            {caso.porque}
          </Reveal>
        </div>
      </section>

      <Related entries={related} locale={locale} />
      <CtaFinal locale={locale} />
    </>
  );
}

/* ============================================================
   Plantilla de artículo (handoff §5.4)
   ============================================================ */
function ArticuloView({ art, locale }: { art: Articulo; locale: Locale }) {
  const toc = art.blocks.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2").map((b) => ({ id: b.id, text: b.text }));
  const related = relatedFor(art);
  const esOnly = locale === "en";

  return (
    <>
      <section className="entry-head" style={{ paddingBottom: "clamp(26px,3vw,44px)" }}>
        <div className="wrap--read stack" style={{ gap: 22 }}>
          <Link href={href(locale, "/insights")} className="link-back label">
            {t(locale, "common.insightsBack")}
          </Link>
          <div className="entry-meta label hero-in">
            <span className="chip chip--ink">{t(locale, "common.articleChip")}</span>
            <span className="muted">{art.topic}</span>
            <span className="muted">·</span>
            <span className="muted">
              {art.min} {t(locale, "common.minRead")}
            </span>
          </div>
          <h1 className="display display--h1-art hero-in" style={{ animationDelay: "95ms" }}>
            {art.title}
          </h1>
          <p className="entry-bajada hero-in" style={{ maxWidth: "72ch", animationDelay: "190ms" }}>
            {art.excerpt}
          </p>
          <div className="art-byline hero-in" style={{ animationDelay: "285ms" }}>
            <span className="label" style={{ color: "var(--f2s-ink)" }}>
              Fix 2 Scale · Senior Partners
            </span>
            <span>
              {pick(locale, "Publicado", "Published")} {art.published}
            </span>
            <span>·</span>
            <span>
              {pick(locale, "Actualizado", "Updated")} {art.updated}
            </span>
          </div>
          {esOnly && <p className="es-only">{t(locale, "common.esOnly")}</p>}
        </div>
      </section>

      <section style={{ padding: "0 0 clamp(36px,4vw,72px)" }}>
        <div className="art-banner" style={{ background: art.bannerBg }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art.banner} alt={art.alt} fetchPriority="high" />
        </div>
      </section>

      <section style={{ padding: "0 var(--pad-x) clamp(44px,5vw,88px)" }}>
        <div className="wrap art-layout">
          <TocNav title={t(locale, "common.inThisArticle")} items={toc} />
          <div className="art-col">
            {art.blocks.map((b, i) => {
              switch (b.type) {
                case "p":
                  return (
                    <Reveal as="p" key={i} className="body-art">
                      <span dangerouslySetInnerHTML={{ __html: b.html }} />
                    </Reveal>
                  );
                case "h2":
                  return (
                    <Reveal as="h2" key={i} id={b.id} className="display display--h2-art art-h2">
                      {b.text}
                    </Reveal>
                  );
                case "h3":
                  return (
                    <Reveal as="h3" key={i} className="art-h3">
                      {b.text}
                    </Reveal>
                  );
                case "callout":
                  return (
                    <Reveal key={i} className="callout">
                      <span className="label" style={{ color: "var(--f2s-blue)" }}>
                        {b.label}
                      </span>
                      <p className="body-art" dangerouslySetInnerHTML={{ __html: b.html }} />
                    </Reveal>
                  );
                case "figure":
                  return (
                    <Reveal as="figure" key={i} className="art-figure">
                      <div className="photo-box">
                        <ImgSlot src={b.src} alt={b.alt} spec={`Imagen B/N 3:2 (mín. 1800×1200): ${b.alt}`} />
                      </div>
                      <figcaption>{b.caption}</figcaption>
                    </Reveal>
                  );
                case "ul":
                  return (
                    <Reveal as="ul" key={i} className="art-ul body-art">
                      {b.items.map((it, k) => (
                        <li key={k} dangerouslySetInnerHTML={{ __html: it }} />
                      ))}
                    </Reveal>
                  );
                case "table":
                  return (
                    <Reveal key={i} className="tbl-wrap">
                      <table className="tbl tbl--art">
                        <thead>
                          <tr>
                            {b.head.map((h, k) => (
                              <th key={k} scope="col">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {b.rows.map((r, k) => (
                            <tr key={k}>
                              {r.map((c, j) => (
                                <td key={j}>{c}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Reveal>
                  );
                case "cta":
                  return (
                    <Reveal key={i} className="art-cta">
                      <span className="label art-cta__label">{b.label}</span>
                      <p>{b.text}</p>
                      <Link href={href(locale, "/contacto")} className="btn btn--art" style={{ alignSelf: "flex-start" }}>
                        {t(locale, "cta.button")}
                      </Link>
                    </Reveal>
                  );
              }
            })}
          </div>
        </div>
      </section>

      <Related entries={related} locale={locale} />
    </>
  );
}
