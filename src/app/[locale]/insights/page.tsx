import { notFound } from "next/navigation";
import { insightsIndex } from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { EntryCard } from "@/components/EntryCard";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { CtaFinal } from "@/components/CtaFinal";
import { Reveal } from "@/components/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(
    locale,
    "/insights",
    pick(locale, "Insights y Recursos", "Insights and Resources"),
    pick(
      locale,
      "Casos con números y notas de campo sobre funnel, CRM, operaciones comerciales y gobierno comercial. Sin teoría: lo que hacemos dentro de las compañías con las que trabajamos.",
      "Cases with numbers and field notes on funnel, CRM, sales operations and commercial governance. No theory: what we do inside the companies we work with.",
    ),
  );
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const cards = insightsIndex.map((e) => ({ id: e.id, type: e.type, node: <EntryCard entry={e} locale={locale} /> }));
  return (
    <>
      <section className="section--head">
        <div className="wrap stack" style={{ gap: 24 }}>
          <div className="eyebrow-hero hero-in">{pick(locale, "Insights y Recursos", "Insights and Resources")}</div>
          <h1 className="display display--h1 hero-in" style={{ animationDelay: "95ms" }}>
            {pick(locale, "Cómo se ensambla un motor comercial. En público.", "How a commercial engine gets assembled. In public.")}
          </h1>
          <p className="lead hero-in" style={{ maxWidth: "66ch", animationDelay: "190ms" }}>
            {pick(
              locale,
              "Casos con números y notas de campo sobre funnel, CRM, operaciones comerciales y gobierno comercial. Sin teoría: lo que hacemos dentro de las compañías con las que trabajamos.",
              "Cases with numbers and field notes on funnel, CRM, sales operations and commercial governance. No theory: what we do inside the companies we work with.",
            )}
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(36px,4vw,72px) var(--pad-x) clamp(48px,6vw,104px)" }}>
        <div className="wrap stack" style={{ gap: "clamp(30px,3.2vw,52px)" }}>
          <InsightsGrid locale={locale} cards={cards} />
          <Reveal as="p" className="grid-note">
            {pick(locale, "Más entradas en producción. Cada caso o artículo nuevo se suma a esta parrilla.", "More entries in production. Each new case or article is added to this grid.")}
          </Reveal>
        </div>
      </section>

      <CtaFinal locale={locale} alt />
    </>
  );
}
