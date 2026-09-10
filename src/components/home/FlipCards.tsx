"use client";

import { useState } from "react";
import { pick, type Locale } from "@/lib/i18n";

type Card = { tag: [string, string]; front: [string, string]; back: [string, string]; what: [string, string] };

const CARDS: Card[] = [
  {
    tag: ["Demanda", "Demand"],
    front: ["Necesitas más leads.", "You need more leads."],
    back: ["Tienes un problema de conversión", "You have a conversion problem"],
    what: [
      "Medimos la conversión etapa por etapa y producto por producto antes de tocar el presupuesto de pauta.",
      "We measure conversion stage by stage and product by product before touching the media budget.",
    ],
  },
  {
    tag: ["Vendedores", "Salespeople"],
    front: ["Necesitas más vendedores.", "You need more salespeople."],
    back: ["Necesitas estructura", "You need structure"],
    what: [
      "Con un proceso definido, cada vendedor nuevo replica lo que funciona. Definimos funnel, cadencia y responsables antes de ampliar el equipo.",
      "With a defined process, every new rep replicates what works. We define funnel, cadence and owners before growing the team.",
    ],
  },
  {
    tag: ["Tecnología", "Technology"],
    front: ["Comprar tecnología lo resuelve.", "Buying technology solves it."],
    back: ["El problema es de proceso", "The problem is process"],
    what: [
      "Un CRM sobre un proceso definido multiplica la disciplina. Diseñamos el proceso primero y después configuramos la herramienta.",
      "A CRM on top of a defined process multiplies discipline. We design the process first and configure the tool after.",
    ],
  },
  {
    tag: ["Marketing", "Marketing"],
    front: ["Es un problema de marketing.", "It is a marketing problem."],
    back: ["Es la alineación entre producto, marketing y ventas", "It is the alignment between product, marketing and sales"],
    what: [
      "El handoff necesita un dueño. Establecemos una sola definición de lead calificado y un tiempo de contacto que sí se mide.",
      "The handoff needs an owner. We set one shared definition of a qualified lead and a contact time that is actually measured.",
    ],
  },
];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#224fea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export function FlipCards({ locale }: { locale: Locale }) {
  const [flipped, setFlipped] = useState<boolean[]>(() => CARDS.map(() => false));
  return (
    <div className="flips">
      {CARDS.map((c, i) => (
        <div className="flip" key={i}>
          <button
            type="button"
            className="flip__btn"
            aria-pressed={flipped[i]}
            onClick={() => setFlipped((v) => v.map((x, j) => (j === i ? !x : x)))}
          >
            <span className="flip__face flip__front">
              <span className="flip__tag label">{pick(locale, ...c.tag)}</span>
              <span className="flip__title">{pick(locale, ...c.front)}</span>
              <span className="flip__foot label">
                <span>{pick(locale, "Lo que realmente pasa", "What is actually happening")}</span>
                <Arrow />
              </span>
            </span>
            <span className="flip__face flip__back">
              <span className="stack" style={{ gap: 10 }}>
                <span className="flip__tag label">{pick(locale, ...c.tag)}</span>
                <span className="flip__title">{pick(locale, ...c.back)}</span>
              </span>
              <span className="flip__what">
                <span className="label">{pick(locale, "Qué hacemos", "What we do")}</span>
                <span>{pick(locale, ...c.what)}</span>
              </span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
