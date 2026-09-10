"use client";

import { useId, useState } from "react";
import { pick, type Locale } from "@/lib/i18n";

type Step = { n: string; title: [string, string]; what: [string, string]; deliverables: [string, string][]; duration: [string, string]; result: [string, string] };

const STEPS: Step[] = [
  {
    n: "01",
    title: ["Identificamos", "We identify"],
    what: ["Auditamos el sistema comercial completo, de la generación de demanda al cierre, y priorizamos la restricción real.", "We audit the full commercial system, from demand generation to close, and prioritise the real constraint."],
    deliverables: [
      ["Mapa del funnel actual por producto", "Current funnel map per product"],
      ["Conversión y costo por etapa", "Conversion and cost per stage"],
      ["Restricción priorizada con impacto estimado", "Prioritised constraint with estimated impact"],
    ],
    duration: ["3–4 semanas", "3–4 weeks"],
    result: ["Sabes exactamente dónde se pierde el revenue.", "You know exactly where revenue is lost."],
  },
  {
    n: "02",
    title: ["Construimos", "We build"],
    what: ["Construimos lo que falta y reconstruimos lo que está mal ensamblado, operando junto a tu equipo, dentro de tu operación.", "We build what is missing and rebuild what is badly assembled, working alongside your team, inside your operation."],
    deliverables: [
      ["Funnel y CRM operando por producto", "Funnel and CRM running per product"],
      ["Cadencia de seguimiento y guiones de cierre", "Follow-up cadence and closing scripts"],
      ["Tablero de reporting en tiempo real", "Real-time reporting dashboard"],
    ],
    duration: ["8–12 semanas", "8–12 weeks"],
    result: ["El motor corre y se mide solo.", "The engine runs and measures itself."],
  },
  {
    n: "03",
    title: ["Fortalecemos", "We strengthen"],
    what: ["Entrenamos al equipo, instalamos los rituales de gestión y transferimos la capacidad completa.", "We train the team, install the management rituals and transfer the full capability."],
    deliverables: [
      ["Entrenamiento y QA comercial", "Commercial training and QA"],
      ["Rituales de gestión semanal", "Weekly management rituals"],
      ["Documentación y transferencia", "Documentation and handover"],
    ],
    duration: ["4–6 semanas", "4–6 weeks"],
    result: ["Tu equipo opera el motor por cuenta propia.", "Your team runs the engine on its own."],
  },
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#224fea" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function Stepper({ locale }: { locale: Locale }) {
  const [i, setI] = useState(0);
  const id = useId();
  const s = STEPS[i];
  return (
    <div className="stack" style={{ gap: "clamp(16px,1.8vw,26px)" }}>
      <div className="steps" role="tablist" aria-label={pick(locale, "Cómo trabajamos", "How we work")}>
        {STEPS.map((st, j) => (
          <button
            key={st.n}
            type="button"
            role="tab"
            id={`${id}-tab-${j}`}
            aria-selected={i === j}
            aria-controls={`${id}-panel`}
            className="step"
            onClick={() => setI(j)}
          >
            <span className="step__n">{st.n}</span>
            <span className="step__t">{pick(locale, ...st.title)}</span>
          </button>
        ))}
      </div>
      <div className="step-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${i}`}>
        <div className="step-panel__col">
          <span className="label muted">{pick(locale, "Qué pasa", "What happens")}</span>
          <p>{pick(locale, ...s.what)}</p>
        </div>
        <div className="step-panel__col">
          <span className="label muted">{pick(locale, "Entregables", "Deliverables")}</span>
          <div className="stack" style={{ gap: 9 }}>
            {s.deliverables.map((d, k) => (
              <div className="step-panel__li" key={k}>
                <Check />
                <span>{pick(locale, ...d)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="step-panel__col" style={{ gap: 18 }}>
          <div className="stack" style={{ gap: 7 }}>
            <span className="label muted">{pick(locale, "Duración", "Duration")}</span>
            <span className="step-panel__dur">{pick(locale, ...s.duration)}</span>
          </div>
          <div className="stack" style={{ gap: 7, borderTop: "1px solid var(--f2s-gray-200)", paddingTop: 14 }}>
            <span className="label muted">{pick(locale, "Resultado", "Result")}</span>
            <span className="step-panel__small">{pick(locale, ...s.result)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
