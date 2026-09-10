"use client";

import { useState } from "react";
import { pick, type Locale } from "@/lib/i18n";

type Stage = { t: [string, string]; r: [string, string] };

const TRACK1: Stage[] = [
  { t: ["Marca y Producto", "Brand and Product"], r: ["Posicionamiento, oferta y pricing antes de cualquier inversión. Con la oferta clara, cada canal rinde.", "Positioning, offer and pricing before any spend. With a clear offer, every channel performs."] },
  { t: ["Awareness y Performance", "Awareness and Performance"], r: ["Generación de demanda con un costo por lead defendible, por producto o servicio y por canal.", "Demand generation with a cost per lead you can defend, per product or service and per channel."] },
  { t: ["Tech y Canales", "Tech and Channels"], r: ["Analytics, social, SEO/SEM y PPC conectados para que cada canal reporte al mismo funnel.", "Analytics, social, SEO/SEM and PPC wired so every channel reports into the same funnel."] },
  { t: ["Web / CRM y Lead Generation", "Web / CRM and Lead Generation"], r: ["Donde el lead se captura y se vuelve trazable. Aquí se alinean los dos tracks.", "Where the lead is captured and becomes traceable. This is where the two tracks align."] },
];
const TRACK2: Stage[] = [
  { t: ["Sales Funnel", "Sales Funnel"], r: ["Un funnel por producto o servicio, con etapas, responsables y tasas de conversión que sí se miden.", "One funnel per product or service, with stages, owners and conversion rates that are actually measured."] },
  { t: ["Customer Journey y Automatización", "Customer Journey and Automation"], r: ["El camino que el comprador recorre de verdad, automatizado donde se repite y humano donde se decide.", "The path the buyer actually takes, automated where it repeats and human where it decides."] },
  { t: ["Lead Nurturing y Scoring", "Lead Nurturing and Scoring"], r: ["Una sola definición de lead calificado, para que marketing y ventas dejen de discutir por calidad.", "One shared definition of a qualified lead, so marketing and sales stop arguing about quality."] },
  { t: ["Seguimiento, Cierre, Training y QA", "Follow-up, Closing, Training and QA"], r: ["Cadencia, guiones y revisión de calidad. Aquí la disciplina se vuelve revenue cerrado.", "Cadence, scripts and quality review. This is where discipline turns into closed revenue."] },
  { t: ["Data Analytics y Reporting", "Data Analytics and Reporting"], r: ["Reporting en tiempo real que la Junta puede leer y el equipo puede accionar la misma semana.", "Real-time reporting the board can read, and the team can act on the same week."] },
  { t: ["Upselling y Cross-selling", "Upselling and Cross-selling"], r: ["Revenue sobre la base que ya ganaste, que es el revenue más barato del motor.", "Revenue from the base you already earned, which is the cheapest revenue in the engine."] },
];

const Down = () => (
  <div className="engine-arrow" aria-hidden="true">
    <svg width="16" height="30" viewBox="0 0 16 30" fill="none">
      <path d="M8 0 V22" stroke="#224fea" strokeWidth="2" />
      <path d="M2.5 17 L8 23.5 L13.5 17" stroke="#224fea" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

export function EngineStages({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<string | null>(null);
  const grid = (stages: Stage[], prefix: string) => (
    <div className={`stages ${active?.startsWith(prefix) ? "has-active" : ""}`}>
      {stages.map((s, i) => {
        const key = `${prefix}${i}`;
        const on = active === key;
        return (
          <button
            key={key}
            type="button"
            className={`stage ${on ? "is-active" : ""}`}
            aria-pressed={on}
            onMouseEnter={() => setActive(key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(key)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(on ? null : key)}
          >
            <span className="stage__t">{pick(locale, ...s.t)}</span>
            <span className="stage__r">{pick(locale, ...s.r)}</span>
          </button>
        );
      })}
    </div>
  );
  return (
    <div className="stack" style={{ gap: "clamp(14px,1.6vw,22px)" }}>
      <div className="label track">
        <span>{pick(locale, "Track 1 · Marketing / Tech / Digital", "Track 1 · Marketing / Tech / Digital")}</span>
      </div>
      {grid(TRACK1, "a")}
      <Down />
      <div className="label track">
        <span>{pick(locale, "Track 2 · Operaciones Comerciales", "Track 2 · Commercial Operations")}</span>
      </div>
      {grid(TRACK2, "b")}
      <Down />
      <div className="revenue">
        <span className="revenue__t">Revenue</span>
        <span style={{ fontSize: 14, color: "var(--f2s-gray-500)", maxWidth: "52ch", textWrap: "pretty" }}>
          {pick(locale, "Consistente, predecible y gestionable, porque el motor está bien construido.", "Consistent, predictable and manageable, because the engine is built right.")}
        </span>
      </div>
    </div>
  );
}
