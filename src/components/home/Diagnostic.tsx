"use client";

import Link from "next/link";
import { useState } from "react";
import { href, pick, type Locale } from "@/lib/i18n";

const SYMPTOMS: [string, string][] = [
  ["Quieres entender realmente tu propuesta de valor (no producto) y quiénes son tus clientes.", "You want to truly understand your value proposition (not your product) and who your clients are."],
  ["Tienes un producto que realmente mejora la vida de las personas, pero no generas suficiente demanda ni prospectos para vender.", "You have a product that genuinely improves people’s lives, but you do not generate enough demand or prospects to sell."],
  ["La demanda llega más rápido de lo que el equipo logra convertir.", "Demand arrives faster than the team manages to convert it."],
  ["El crecimiento es impredecible, difícil de proyectar y no se cumplen las metas.", "Growth is unpredictable, hard to forecast, and targets are missed."],
  ["El revenue depende de personas específicas y no de un sistema comercial.", "Revenue depends on specific people rather than on a commercial system."],
  ["Marketing, ventas y operaciones avanzan en esfuerzos aislados.", "Marketing, sales and operations move in isolated efforts."],
];

const MSG_ES = [
  "Marca las afirmaciones que reconoces y te decimos dónde suele estar la restricción.",
  "Una sola afirmación ya cuesta revenue todos los meses. Vale la pena medirlo.",
  "Dos afirmaciones casi siempre comparten una misma causa.",
  "Tres: la restricción suele estar en la alineación entre producto, marketing y ventas.",
  "Cuatro: el problema no es de esfuerzo, es de ensamblaje.",
  "Con cinco, es probable que el proceso comercial completo deba revisarse y reconstruirse.",
  "Las seis: la demanda está ahí; el motor comercial está por ensamblar.",
];
const MSG_EN = [
  "Tick the statements you recognise and we will tell you where the constraint usually sits.",
  "A single statement already costs revenue every month. It is worth measuring.",
  "Two statements almost always share one cause.",
  "Three: the constraint usually sits in the alignment between product, marketing and sales.",
  "Four: the problem is not effort, it is assembly.",
  "With five, the whole commercial process likely needs to be reviewed and rebuilt.",
  "All six: demand is there; the commercial engine is still to be assembled.",
];

export function Diagnostic({ locale }: { locale: Locale }) {
  const [on, setOn] = useState<boolean[]>(() => SYMPTOMS.map(() => false));
  const n = on.filter(Boolean).length;
  const msgs = locale === "en" ? MSG_EN : MSG_ES;
  return (
    <div className="diag">
      <div className="diag__head">
        <span className="eyebrow eyebrow--plain" style={{ color: "var(--f2s-ink)" }}>
          {pick(locale, "¿Cuáles reconoces en tu operación?", "Which of these do you recognise?")}
        </span>
        <span className="num" style={{ fontWeight: 700, fontSize: 13, color: "var(--f2s-blue)" }} aria-live="polite">
          {n} / {SYMPTOMS.length}
        </span>
      </div>
      <div className="stack">
        {SYMPTOMS.map(([es, en], i) => (
          <button
            key={i}
            type="button"
            className="diag__row"
            aria-pressed={on[i]}
            onClick={() => setOn((v) => v.map((x, j) => (j === i ? !x : x)))}
          >
            <span className="diag__box" aria-hidden="true">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="#0a0a0a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 5 4.4 8.4 11 1.8" />
              </svg>
            </span>
            <span className="diag__text">{pick(locale, es, en)}</span>
          </button>
        ))}
      </div>
      <div className="diag__foot">
        <p className="diag__msg" aria-live="polite">
          {msgs[n]}
        </p>
        {n > 0 && (
          <Link href={href(locale, "/contacto")} className="btn btn--sm" style={{ alignSelf: "flex-start" }}>
            {pick(locale, "Agenda un diagnóstico", "Book a discovery call")}
          </Link>
        )}
      </div>
    </div>
  );
}
