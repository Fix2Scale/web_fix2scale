import { notFound } from "next/navigation";
import { isLocale, pick, SITE } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { ImgSlot } from "@/components/ImgSlot";
import { ContactForm } from "@/components/contact/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(
    locale,
    "/contacto",
    pick(locale, "Contacto · Agenda un diagnóstico", "Contact · Book a discovery call"),
    pick(
      locale,
      "Empecemos por identificar la restricción real. Escríbenos o elige un horario en el calendario: 45 minutos directamente con uno de los dos socios.",
      "Let us start by identifying the real constraint. Write to us or pick a slot on the calendar: 45 minutes directly with one of the two partners.",
    ),
  );
}

const Cal = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M8 2v4M16 2v4M3 9h18M4 5h16v16H4z" />
  </svg>
);

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <section className="section--head">
        <div className="wrap stack" style={{ gap: 24 }}>
          <div className="eyebrow-hero hero-in">{pick(locale, "Contacto", "Contact")}</div>
          <h1 className="display display--h1 hero-in" style={{ animationDelay: "95ms" }}>
            {pick(locale, "Agenda un diagnóstico.", "Book a discovery call.")}
          </h1>
          <p className="lead hero-in" style={{ maxWidth: "66ch", animationDelay: "190ms" }}>
            {pick(
              locale,
              "Empecemos por identificar la restricción real. Escríbenos y coordinamos una conversación inicial. Los ingresos se vuelven más consistentes, predecibles y gestionables cuando el motor está bien construido.",
              "Let us start by identifying the real constraint. Write to us and we will set up an initial conversation. Revenue becomes more consistent, predictable and manageable when the engine is built right.",
            )}
          </p>
        </div>
      </section>

      <section className="section--dark" style={{ padding: "clamp(40px,4.6vw,76px) var(--pad-x)" }}>
        <div className="wrap stack" style={{ gap: "clamp(22px,2.4vw,36px)" }}>
          <span className="eyebrow eyebrow--plain eyebrow--soft">{pick(locale, "Dos formas de empezar", "Two ways to start")}</span>
          <div className="ways">
            <div className="way">
              <div className="stack" style={{ gap: 14 }}>
                <span className="label" style={{ color: "var(--f2s-blue-soft)" }}>
                  {pick(locale, "Opción 01 · La más rápida", "Option 01 · Fastest")}
                </span>
                <span className="way__t">{pick(locale, "Elige un horario en el calendario", "Pick a slot on the calendar")}</span>
                <p className="way__p">{pick(locale, "45 minutos directamente con uno de los dos socios: hablamos de tu funnel desde el primer minuto.", "45 minutes directly with one of the two partners: we talk about your funnel from the first minute.")}</p>
              </div>
              <a href={SITE.calendar} target="_blank" rel="noopener noreferrer" className="btn btn--md" style={{ alignSelf: "flex-start" }}>
                <Cal />
                <span>{pick(locale, "Agenda en el calendario", "Book on the calendar")}</span>
              </a>
            </div>
            <div className="way way--soft">
              <div className="stack" style={{ gap: 14 }}>
                <span className="label muted">{pick(locale, "Opción 02", "Option 02")}</span>
                <span className="way__t">{pick(locale, "Envíanos el contexto primero", "Send us the context first")}</span>
                <p className="way__p">{pick(locale, "Llena el formulario y llegamos a la llamada con una primera lectura de qué está limitando tu crecimiento.", "Fill in the form and we arrive at the call with a first read of what is limiting your growth.")}</p>
              </div>
              <a href="#formulario" className="link-under link-under--white" style={{ alignSelf: "flex-start", letterSpacing: "0.09em" }}>
                {pick(locale, "Ir al formulario", "Go to the form")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section--inner">
        <div className="wrap contact-grid">
          <Reveal className="stack min0" style={{ gap: "clamp(24px,2.6vw,40px)" }}>
            <div className="stack" style={{ gap: 16 }}>
              <span className="eyebrow eyebrow--plain eyebrow--gray">{pick(locale, "Contacto directo", "Direct contact")}</span>
              <div className="contact-person">
                <span className="contact-person__n">Néstor Fonseca G.</span>
                <span className="muted" style={{ fontSize: 13 }}>
                  Senior Partner
                </span>
              </div>
              <div className="contact-person">
                <span className="contact-person__n">Felipe Jiménez G.</span>
                <span className="muted" style={{ fontSize: 13 }}>
                  Senior Partner
                </span>
              </div>
              <div className="contact-person">
                <span className="muted" style={{ fontSize: 13 }}>
                  {pick(locale, "Escríbenos", "Write to us")}
                </span>
                <a href={`mailto:${SITE.email}`} style={{ fontSize: 15 }}>
                  {SITE.email}
                </a>
              </div>
            </div>
            <div className="photo-box">
              <ImgSlot src="/images/photos/equipo-bn.jpg" alt={pick(locale, "Sala comercial en operación", "Sales floor in operation")} spec="Foto B/N, horizontal 3:2 (mín. 1800×1200): sala comercial en operación" />
            </div>
          </Reveal>
          <Reveal delay={100} className="min0" id="formulario" style={{ scrollMarginTop: 110 }}>
            <ContactForm locale={locale} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
