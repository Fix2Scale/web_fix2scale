import { notFound } from "next/navigation";
import { isLocale, pick } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { CtaFinal } from "@/components/CtaFinal";
import { ImgSlot } from "@/components/ImgSlot";
import { EngineStages } from "@/components/services/EngineStages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(
    locale,
    "/servicios",
    pick(locale, "Servicios · El motor comercial completo", "Services · The complete commercial engine"),
    pick(
      locale,
      "De la estrategia y la demanda al cierre, la retención y la medición. Un motor conectado que va de demanda a revenue: Marketing / Tech / Digital y Operaciones Comerciales.",
      "From strategy and demand to closing, retention and measurement. One connected engine from demand to revenue: Marketing / Tech / Digital and Commercial Operations.",
    ),
  );
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <section className="section--head">
        <div className="wrap stack" style={{ gap: 24 }}>
          <div className="eyebrow-hero hero-in">{pick(locale, "Servicios", "Services")}</div>
          <h1 className="display display--h1 hero-in" style={{ animationDelay: "95ms" }}>
            {pick(locale, "El motor comercial completo.", "The complete commercial engine.")}
          </h1>
          <p className="lead hero-in" style={{ maxWidth: "62ch", animationDelay: "190ms" }}>
            {pick(locale, "De la estrategia y la demanda al cierre, la retención y la medición. Un motor conectado que va de demanda a revenue.", "From strategy and demand to closing, retention and measurement. One connected engine that runs from demand to revenue.")}
          </p>
        </div>
      </section>

      <section className="section--inner">
        <div className="wrap stack" style={{ gap: "clamp(26px,2.6vw,44px)" }}>
          <Reveal className="engine-head">
            <span className="eyebrow eyebrow--plain eyebrow--gray">{pick(locale, "El motor · pasa el puntero o toca una etapa", "The engine · hover or tap a stage")}</span>
            <span className="num" style={{ fontWeight: 500, fontSize: 12, color: "var(--f2s-gray-500)" }}>
              {pick(locale, "Demanda → Revenue", "Demand → Revenue")}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <EngineStages locale={locale} />
          </Reveal>
        </div>
      </section>

      <section className="section--inner section--alt">
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <Reveal className="stack min0" style={{ gap: 22 }}>
            <span className="eyebrow eyebrow--plain">{pick(locale, "El método aplicado", "The method applied")}</span>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,58px)" }}>
              {pick(locale, "Primero la restricción, después la reconstrucción.", "First the constraint, then the rebuild.")}
            </h2>
            <p className="lead" style={{ fontSize: "clamp(16px,1.25vw,20px)", maxWidth: "52ch" }}>
              {pick(locale, "Primero encontramos la restricción real, después reconstruimos el sistema, y lo dejamos operando en tu equipo.", "First we find the real constraint, then we rebuild the system, and we leave it running inside your team.")}
            </p>
          </Reveal>
          <Reveal delay={100} className="photo-box">
            <ImgSlot
              src="/images/photos/operacion-vertical.jpg"
              alt={pick(locale, "Los dos socios trabajando con el equipo del cliente", "The two partners working with the client team")}
              spec="Foto B/N, horizontal 3:2 (mín. 1800×1200): los dos socios trabajando con el equipo del cliente"
              style={{ objectPosition: "center 30%" }}
            />
          </Reveal>
        </div>
      </section>

      <CtaFinal locale={locale} />
    </>
  );
}
