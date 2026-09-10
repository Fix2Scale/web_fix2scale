import Link from "next/link";
import { casos } from "@/lib/content";
import { href, isLocale, pick, t, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { CtaFinal } from "@/components/CtaFinal";
import { Diagnostic } from "@/components/home/Diagnostic";
import { FlipCards } from "@/components/home/FlipCards";
import { Stepper } from "@/components/home/Stepper";
import { Faq } from "@/components/home/Faq";
import { CaseSlider } from "@/components/home/CaseSlider";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(
    locale,
    "/",
    pick(locale, "Fix 2 Scale · Consultoría de Growth, Marketing y Ventas", "Fix 2 Scale · Growth, Marketing and Sales consultancy"),
    pick(
      locale,
      "Identificamos qué limita tu crecimiento y construimos el modelo comercial para escalarlo. Te construimos un motor comercial propio y te entregamos las llaves.",
      "We identify what limits your growth and build the commercial model to scale it. We build you a commercial engine of your own and hand you the keys.",
    ),
    { title: { absolute: pick(locale, "Fix 2 Scale · Consultoría de Growth, Marketing y Ventas", "Fix 2 Scale · Growth, Marketing and Sales consultancy") } },
  );
}

/* Cifras de la banda: caso de la universidad, cifras v2 confirmadas (casos.json). */
const BAND: { v: string; l: [string, string]; lime?: boolean }[] = [
  { v: "+16%", l: ["matrículas en un semestre", "enrollment in one semester"], lime: true },
  { v: "$409M", l: ["en ingresos incrementales (COP)", "in incremental revenue (COP)"] },
  { v: "42%", l: ["de ahorro en agencias externas", "savings on external agencies"] },
];

function BandGroup({ locale, hidden }: { locale: Locale; hidden?: boolean }) {
  return (
    <div className="band__group" aria-hidden={hidden ? "true" : undefined}>
      {BAND.map((b, i) => (
        <span key={i} style={{ display: "contents" }}>
          <div className="band__item">
            <span className={`num band__num ${b.lime ? "band__num--lime" : ""}`}>{b.v}</span>
            <span className="band__label">{pick(locale, ...b.l)}</span>
          </div>
          <span className="band__dot">·</span>
        </span>
      ))}
    </div>
  );
}

const BENTO: { t: [string, string]; d: [string, string]; mod?: string }[] = [
  { t: ["Marca y Producto", "Brand and Product"], d: ["Posicionamiento, oferta y pricing antes de cualquier inversión.", "Positioning, offer and pricing before any spend."] },
  { t: ["Awareness y Performance", "Awareness and Performance"], d: ["Demanda con un costo por lead que puedes defender.", "Demand with a cost per lead you can defend."] },
  { t: ["Tech y Canales", "Tech and Channels"], d: ["Analytics, social, SEO/SEM y PPC reportando al mismo funnel.", "Analytics, social, SEO/SEM and PPC reporting into one funnel."] },
  {
    t: ["Web, CRM y Lead Generation", "Web, CRM and Lead Generation"],
    d: [
      "Donde el lead se captura y se vuelve trazable. Aquí se juega la alineación entre marketing y ventas, y es donde se pierde la mayoría del revenue.",
      "Where the lead is captured and becomes traceable. This is where marketing and sales alignment is decided, and where most revenue is lost.",
    ],
    mod: "bento__card--wide bento__card--dark",
  },
  { t: ["Sales Funnel y Customer Journey", "Sales Funnel and Customer Journey"], d: ["Un funnel por producto, con etapas, responsables y tasas que sí se miden.", "One funnel per product, with stages, owners and rates that are actually measured."], mod: "bento__card--mid" },
  { t: ["Seguimiento, Cierre y QA", "Follow-up, Closing and QA"], d: ["Cadencia, guiones y revisión de calidad. Aquí la disciplina se vuelve revenue.", "Cadence, scripts and quality review. Where discipline turns into revenue."] },
  { t: ["Analítica y Reporting", "Analytics and Reporting"], d: ["Reporting que la Junta lee y el equipo acciona la misma semana.", "Reporting the board reads and the team acts on the same week."] },
];

const PIECES: [string, string][] = [
  ["Estrategia", "Strategy"],
  ["Propuesta de valor", "Value proposition"],
  ["Marketing", "Marketing"],
  ["Modelo comercial", "Commercial model"],
  ["Transferencia de conocimiento", "Knowledge transfer"],
];

const ArrowR = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#224fea" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h13" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);
const ArrowNE = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#224fea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "0 0 auto" }}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export default async function HomePage({ params }: Props) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__wrap">
          <div className="eyebrow-hero eyebrow-hero--dash hero-in">
            <span>{pick(locale, "Consultoría estratégica de Growth, Marketing y Ventas", "Strategic Growth, Marketing and Sales consultancy")}</span>
          </div>
          <h1 className="display display--h1-hero hero-in" style={{ animationDelay: "95ms" }}>
            {pick(locale, "Identificamos qué limita tu crecimiento y construimos el modelo comercial para escalarlo.", "We identify what limits your growth and build the commercial model to scale it.")}
          </h1>
          <p className="hero__lead hero-in" style={{ animationDelay: "190ms" }}>
            {pick(locale, "Te construimos un motor comercial propio, lo probamos con números y te entregamos las llaves.", "We build you a commercial engine of your own, prove it with numbers, and hand you the keys.")}
          </p>
          <div className="hero__actions hero-in" style={{ animationDelay: "285ms" }}>
            <Link href={href(locale, "/contacto")} className="btn btn--hero">
              {t(locale, "nav.cta")}
            </Link>
            <Link href={href(locale, "/servicios")} className="link-under">
              {pick(locale, "Ver el motor comercial", "See the commercial engine")}
            </Link>
          </div>
        </div>
      </section>

      {/* BANDA */}
      <section className="band" aria-label={pick(locale, "Resultados verificados", "Verified results")}>
        <div className="label band__eyebrow">{pick(locale, "Verificado en una fase de acompañamiento · Una universidad privada", "Verified in one engagement phase · One private university")}</div>
        <div className="band__track">
          <BandGroup locale={locale} />
          <BandGroup locale={locale} hidden />
          <BandGroup locale={locale} hidden />
          <BandGroup locale={locale} hidden />
        </div>
      </section>

      {/* CUÁNDO NOS NECESITAS */}
      <section className="section">
        <div className="wrap diag-grid">
          <div className="diag-sticky">
            <Reveal className="eyebrow">
              <span>{pick(locale, "Cuándo nos necesitas", "When you need us")}</span>
            </Reveal>
            <Reveal as="h2" className="display display--h2">
              {pick(locale, "La demanda ya existe. Falta el sistema que la convierte.", "Demand already exists. What is missing is the system that converts it.")}
            </Reveal>
            <Reveal as="p" delay={60} className="lead" style={{ fontSize: "clamp(15px,1.15vw,18px)", lineHeight: 1.55, maxWidth: "46ch" }}>
              {pick(locale, "Hay producto, capacidad y ambición. Falta el sistema comercial que convierte todo eso en ingresos de forma consistente.", "There is product, capability and ambition. What is missing is the commercial system that turns all of it into consistent revenue.")}
            </Reveal>
          </div>
          <Reveal delay={80} className="min0">
            <Diagnostic locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* NUESTRO ENFOQUE */}
      <section className="section section--alt">
        <div className="wrap stack" style={{ gap: "clamp(26px,2.8vw,44px)" }}>
          <Reveal className="eyebrow">
            <span>{pick(locale, "Nuestro enfoque", "Our approach")}</span>
          </Reveal>
          <div className="stack" style={{ gap: 20, maxWidth: 900 }}>
            <Reveal as="h2" className="display display--h2">
              {pick(locale, "El síntoma aparece en un lugar y la causa está en otro.", "The symptom shows up in one place and the cause is in another.")}
            </Reveal>
            <Reveal as="p" delay={60} className="lead" style={{ fontSize: "clamp(15px,1.15vw,18px)", lineHeight: 1.55, maxWidth: "58ch" }}>
              {pick(locale, "Resolver el síntoma deja intacta la causa. Estas son las cuatro conclusiones con las que llegan los clientes — y lo que encontramos debajo de cada una.", "Solving the symptom leaves the cause intact. These are the four conclusions clients arrive with — and what we find underneath each one.")}
            </Reveal>
          </div>
          <Reveal delay={100}>
            <FlipCards locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* NUESTRO DIFERENCIAL */}
      <section className="section">
        <div className="wrap stack" style={{ gap: "clamp(30px,3.2vw,52px)" }}>
          <Reveal className="eyebrow">
            <span>{pick(locale, "Nuestro diferencial", "What sets us apart")}</span>
          </Reveal>
          <div className="stack" style={{ gap: 26, maxWidth: 1000 }}>
            <Reveal as="h2" className="display display--h2">
              {pick(locale, "Conocemos el negocio completo porque lo hemos operado desde adentro.", "We know the whole business because we have operated it from the inside.")}
            </Reveal>
            <Reveal as="p" delay={60} style={{ fontSize: "clamp(16px,1.4vw,22px)", lineHeight: 1.45, color: "var(--f2s-graphite)", maxWidth: "58ch", textWrap: "pretty" }}>
              {pick(locale, "La mayoría domina una pieza. Nosotros conectamos las cinco que casi siempre se gestionan por separado. Ahí es justo donde se rompe el crecimiento.", "Most firms own one piece. We connect the five that are almost always managed separately. That is exactly where growth breaks.")}
            </Reveal>
          </div>
          <Reveal delay={100} className="pieces">
            {PIECES.map((p, i) => (
              <span key={i} style={{ display: "contents" }}>
                {i > 0 && (
                  <div className="piece__arrow" aria-hidden="true">
                    <ArrowR />
                  </div>
                )}
                <div className={`piece ${i === PIECES.length - 1 ? "piece--dark" : ""}`}>
                  <span className="num piece__n">{i + 1}</span>
                  <span className="piece__t">{pick(locale, ...p)}</span>
                </div>
              </span>
            ))}
          </Reveal>
          <Reveal delay={140} className="label label--11" style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--f2s-ink)", letterSpacing: "0.14em" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#29aec1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H6" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span>{pick(locale, "El último eslabón devuelve la capacidad a tu equipo", "The last link returns the capability to your team")}</span>
          </Reveal>
          <Reveal delay={180} className="bias">
            <span className="label label--12 muted">{pick(locale, "El sesgo de las firmas", "The firms bias")}</span>
            <p>{pick(locale, "Otras firmas llegan con la respuesta antes de entender el problema. Si venden pauta, recomiendan pauta. Si venden CRM, recomiendan CRM.", "Most firms arrive with the answer before understanding the problem. If they sell ads, they recommend ads. If they sell CRM, they recommend CRM.")}</p>
          </Reveal>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="section section--alt">
        <div className="wrap stack" style={{ gap: "clamp(26px,2.8vw,44px)" }}>
          <Reveal className="eyebrow">
            <span>{pick(locale, "Cómo trabajamos", "How we work")}</span>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))", gap: "clamp(24px,3vw,64px)", alignItems: "end" }}>
            <Reveal as="h2" className="display display--h2 min0">
              {pick(locale, "Identificamos. Construimos. Fortalecemos.", "We identify. We build. We strengthen.")}
            </Reveal>
            <Reveal as="p" delay={60} className="how-sub min0">
              {pick(locale, "Y lo dejamos operando dentro de tu equipo.", "And we leave it running inside your team.")}
            </Reveal>
          </div>
          <Reveal delay={100}>
            <Stepper locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* EL MOTOR COMERCIAL (bento) */}
      <section className="section">
        <div className="wrap stack" style={{ gap: "clamp(26px,2.8vw,44px)" }}>
          <Reveal className="eyebrow">
            <span>{pick(locale, "El motor comercial", "The commercial engine")}</span>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))", gap: "clamp(24px,3vw,64px)", alignItems: "end" }}>
            <Reveal as="h2" className="display display--h2 min0">
              {pick(locale, "Siete piezas. Un solo motor conectado.", "Seven pieces. One connected engine.")}
            </Reveal>
            <Reveal delay={60} className="min0">
              <Link href={href(locale, "/servicios")} className="link-under">
                {pick(locale, "Ver el motor completo", "See the full engine")}
              </Link>
            </Reveal>
          </div>
          <Reveal delay={100} className="bento">
            {BENTO.map((b, i) => (
              <Link key={i} href={href(locale, "/servicios")} className={`bento__card ${b.mod ?? ""}`}>
                <div className="bento__head">
                  <span className="bento__t">{pick(locale, ...b.t)}</span>
                  <ArrowNE />
                </div>
                <span className="bento__d">{pick(locale, ...b.d)}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SLIDER DE CASOS */}
      <section className="section section--dark">
        <Reveal className="wrap" delay={60}>
          <CaseSlider casos={casos} locale={locale} />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="wrap faq-grid">
          <div className="stack min0" style={{ gap: 20 }}>
            <Reveal className="eyebrow">
              <span>{pick(locale, "Preguntas frecuentes", "Frequently asked")}</span>
            </Reveal>
            <Reveal as="h2" className="display display--h2-faq">
              {pick(locale, "Antes de agendar la llamada.", "Before you book the call.")}
            </Reveal>
          </div>
          <Reveal delay={80} className="min0">
            <Faq locale={locale} />
          </Reveal>
        </div>
      </section>

      <CtaFinal locale={locale} />
    </>
  );
}
