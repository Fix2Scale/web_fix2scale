"use client";

import { useState, type ReactNode } from "react";
import { pick, type Locale } from "@/lib/i18n";

type Kind = "todo" | "articulo" | "caso";

/**
 * Filtro por tipo de la parrilla. Recibe las tarjetas ya renderizadas en el servidor
 * (con su tipo) y solo decide cuáles mostrar.
 */
export function InsightsGrid({ locale, cards }: { locale: Locale; cards: { id: string; type: "caso" | "articulo"; node: ReactNode }[] }) {
  const [kind, setKind] = useState<Kind>("todo");
  const visible = cards.filter((c) => kind === "todo" || c.type === kind);
  const n = visible.length;
  const count = locale === "en" ? `${n} ${n === 1 ? "entry" : "entries"}` : `${n} ${n === 1 ? "entrada" : "entradas"}`;
  const filters: { k: Kind; l: [string, string] }[] = [
    { k: "todo", l: ["Todo", "All"] },
    { k: "articulo", l: ["Artículos", "Articles"] },
    { k: "caso", l: ["Casos de éxito", "Success stories"] },
  ];
  return (
    <>
      <div className="filterbar" role="group" aria-label={pick(locale, "Filtrar", "Filter")}>
        <span className="label muted" style={{ marginRight: 8 }}>
          {pick(locale, "Filtrar", "Filter")}
        </span>
        {filters.map((f) => (
          <button key={f.k} type="button" className="filter-btn" aria-pressed={kind === f.k} onClick={() => setKind(f.k)}>
            {pick(locale, ...f.l)}
          </button>
        ))}
        <span className="muted" style={{ marginLeft: "auto", fontSize: 13 }} aria-live="polite">
          {count}
        </span>
      </div>
      <div className="grid-cards">
        {visible.map((c, i) => (
          <div key={c.id} className="reveal is-shown" style={{ transitionDelay: `${Math.min(i, 8) * 60}ms` }}>
            {c.node}
          </div>
        ))}
      </div>
    </>
  );
}
