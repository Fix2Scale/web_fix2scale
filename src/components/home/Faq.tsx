"use client";

import { useId, useState } from "react";
import { pick, type Locale } from "@/lib/i18n";

const FAQ: { q: [string, string]; a: [string, string] }[] = [
  {
    q: ["¿Cuánto dura un proyecto?", "How long does a project take?"],
    a: [
      "El diagnóstico toma de 3 a 4 semanas. Una reconstrucción completa, entre 4 y 6 meses según el alcance. Trabajamos por fases, con alcance y fecha de cierre definidos.",
      "The diagnosis takes 3 to 4 weeks. A full rebuild, 4 to 6 months depending on scope. We work in phases, with a defined scope and end date.",
    ],
  },
  {
    q: ["¿Cómo cobran?", "How do you charge?"],
    a: [
      "Fee fijo por fase, definido después del diagnóstico. Cobramos por el trabajo, con un incentivo independiente de tu inversión en pauta y de tus ventas.",
      "A fixed fee per phase, defined after the diagnosis. We charge for the work, with an incentive independent of your media spend and your sales.",
    ],
  },
  {
    q: ["¿Qué necesitan de mi equipo?", "What do you need from my team?"],
    a: [
      "Acceso a los datos comerciales y un responsable interno con capacidad de decisión. El trabajo operativo lo hacemos nosotros, junto a tu equipo.",
      "Access to your commercial data and one internal owner who can make decisions. The operational work is ours, done alongside your team.",
    ],
  },
  {
    q: ["¿Reemplazan a mi agencia?", "Do you replace my agency?"],
    a: [
      "Depende del diagnóstico. Definimos qué capacidad debe quedar adentro y qué tiene sentido tercerizar. En un caso, eso eliminó hasta 42% del gasto de agencia.",
      "It depends on the diagnosis. We define which capability should stay in-house and what makes sense to outsource. In one case, that removed up to 42% of agency spend.",
    ],
  },
  {
    q: ["¿Qué pasa cuando termina el acompañamiento?", "What happens when the engagement ends?"],
    a: [
      "Te entregamos las llaves: procesos documentados, equipo entrenado y el motor operando in-house. Si nos vuelves a llamar, es por decisión propia.",
      "We hand you the keys: documented processes, a trained team and the engine running in-house. If you call us again, it is your own choice.",
    ],
  },
];

export function Faq({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="stack">
      {FAQ.map((f, i) => {
        const on = open === i;
        return (
          <div className="faq" key={i}>
            <button
              type="button"
              className="faq__btn"
              aria-expanded={on}
              aria-controls={`${id}-p${i}`}
              onClick={() => setOpen(on ? null : i)}
            >
              <span className="faq__q">{pick(locale, ...f.q)}</span>
              <span className="faq__sign" aria-hidden="true">
                {on ? "−" : "+"}
              </span>
            </button>
            <div className="faq__panel" id={`${id}-p${i}`} hidden={!on}>
              <p>{pick(locale, ...f.a)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
