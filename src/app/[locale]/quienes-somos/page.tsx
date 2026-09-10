import { notFound } from "next/navigation";
import { isLocale, pick } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { CtaFinal } from "@/components/CtaFinal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(
    locale,
    "/quienes-somos",
    pick(locale, "Quiénes Somos · Dos operadores senior", "About Us · Two senior operators"),
    pick(
      locale,
      "Detrás de Fix 2 Scale hay dos Senior Partners que ejecutan cada proyecto. Más de 20 años combinados ejecutando desde adentro de las organizaciones.",
      "Behind Fix 2 Scale there are two Senior Partners who run every engagement. More than 20 years combined executing from inside organizations.",
    ),
  );
}

const LinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.9 21.5h4.2V9.7H2.9v11.8ZM9.6 9.7h4v1.6h.06c.56-1.02 1.93-2.1 3.97-2.1 4.25 0 5.03 2.62 5.03 6.03v6.27h-4.2v-5.56c0-1.4-.03-3.2-1.98-3.2-1.98 0-2.28 1.52-2.28 3.1v5.66H9.6V9.7Z" />
  </svg>
);

const PARTNERS: { name: string; first: string; photo: string; linkedin: string; bio: [string, string]; proof: [string, string] }[] = [
  {
    name: "Néstor Fonseca G.",
    first: "Néstor",
    photo: "/images/photos/headshot-nestor.jpg",
    linkedin: "https://www.linkedin.com/in/nestor-raul-fonseca-guerrero",
    bio: [
      "15+ años liderando crecimiento y revenue en edtech, educación superior, banca, seguros y telecom. Ha construido y liderado equipos comerciales que crecen por sistema.",
      "15+ years leading growth and revenue in edtech, higher education, banking, insurance and telecom. He has built and led commercial teams that grow through systems.",
    ],
    proof: [
      "+88% de revenue Enterprise y +58% de MRR B2B en Platzi. Población estudiantil +48% y metas cumplidas 4 años seguidos en EAN.",
      "+88% Enterprise revenue and +58% B2B MRR at Platzi. Student population +48% and targets met 4 years running at EAN.",
    ],
  },
  {
    name: "Felipe Jiménez G.",
    first: "Felipe",
    photo: "/images/photos/headshot-felipe.jpg",
    linkedin: "https://www.linkedin.com/in/felipejimenezgomez",
    bio: [
      "10+ años construyendo sistemas go-to-market y CRM para servicios B2B y compañías tech-enabled en tres continentes. Especialista en llevar una función comercial de cero a operación medible.",
      "10+ years building go-to-market systems and CRM for B2B services and tech-enabled companies across three continents. He specializes in taking a commercial function from zero to measurable operation.",
    ],
    proof: [
      "110% de la meta de revenue dos años seguidos y +20% de conversión en educación digital en EAN. Marketing y funnel B2B desde cero para una firma tech-enabled con respaldo de Private Equity.",
      "110% of revenue target two years running and +20% conversion in digital education at EAN. Marketing and B2B funnel from scratch for a tech-enabled firm backed by Private Equity.",
    ],
  },
];

export default async function QuienesSomosPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <section className="section--head">
        <div className="wrap stack" style={{ gap: 24 }}>
          <div className="eyebrow-hero hero-in">{pick(locale, "Quiénes Somos", "About Us")}</div>
          <h1 className="display display--h1 hero-in" style={{ animationDelay: "95ms" }}>
            {pick(locale, "Detrás de Fix 2 Scale hay dos operadores senior.", "Behind Fix 2 Scale there are two senior operators.")}
          </h1>
          <p className="lead hero-in" style={{ maxWidth: "70ch", animationDelay: "190ms" }}>
            {pick(
              locale,
              "Los dos socios ejecutan cada proyecto. Conversamos con una Junta sobre crecimiento y gobierno comercial, y nos sentamos con los equipos en funnel, CRM y métricas. Más de 20 años combinados ejecutando desde adentro de las organizaciones.",
              "The two partners run every engagement. We talk to a Board about growth and commercial governance, and we sit with the teams on funnel, CRM and metrics. More than 20 years combined executing from inside organizations.",
            )}
          </p>
        </div>
      </section>

      <section className="section--inner section--dark">
        <div className="wrap profiles">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 110} className="profile">
              <div className="profile__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={`${p.name}, Senior Partner`} loading={i === 0 ? "eager" : "lazy"} />
              </div>
              <div className="stack" style={{ gap: 6 }}>
                <span className="profile__name">{p.name}</span>
                <span className="profile__role">Senior Partner</span>
              </div>
              <p className="profile__bio">{pick(locale, ...p.bio)}</p>
              <p className="profile__proof">{pick(locale, ...p.proof)}</p>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ alignSelf: "flex-start" }}>
                <LinkedIn />
                <span>{pick(locale, `Conecta con ${p.first} en LinkedIn`, `Connect with ${p.first} on LinkedIn`)}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section--inner">
        <div className="wrap stack" style={{ gap: "clamp(28px,3vw,48px)" }}>
          <Reveal as="h2" className="display" style={{ fontSize: "clamp(30px,3.8vw,62px)" }}>
            {pick(locale, "Operadores senior, de principio a fin.", "Senior operators, start to finish.")}
          </Reveal>
          <div className="about-grid">
            <Reveal as="p">
              {pick(
                locale,
                "Una agencia te alquila un servicio y se queda con el conocimiento. Nosotros reconstruimos tu motor comercial y te entregamos las llaves: el sistema queda operando dentro de tu equipo, con la capacidad instalada para escalar solo.",
                "An agency rents you a service and keeps the knowledge. We rebuild your commercial engine and hand you the keys: the system stays running inside your team, with the capability installed to scale on its own.",
              )}
            </Reveal>
            <Reveal as="p" delay={110}>
              {pick(
                locale,
                "Ese es el diferencial: diagnosticar el problema real desde experiencia de operador, reconstruir el sistema completo y dejar a tu equipo autónomo.",
                "That is the difference: diagnosing the real problem from operator experience, rebuilding the complete system and leaving your team autonomous.",
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaFinal locale={locale} alt />
    </>
  );
}
