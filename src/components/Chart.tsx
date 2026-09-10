"use client";

import { useEffect, useRef } from "react";
import type { Chart as ChartData } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { fmt } from "./Counter";

type Props = {
  chart: ChartData;
  locale: Locale;
  size?: "slide" | "page";
  immediate?: boolean;
};

/**
 * Gráfico de dos barras antes/después. La barra "después" siempre es 100%;
 * la barra "antes" es proporcional. Crecen desde 0 en 700ms, la segunda con 120ms de retardo.
 */
export function Chart({ chart, locale, size = "slide", immediate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const aPct = Math.max(2, Math.round((chart.a / chart.b) * 1000) / 10);
  const aText = chart.aDisplay ?? fmt(chart.a, 0, locale);
  const bText = chart.bDisplay ?? fmt(chart.b, 0, locale);
  const aLabel = locale === "en" && chart.aLabelEn ? chart.aLabelEn : chart.aLabel;
  const bLabel = locale === "en" && chart.bLabelEn ? chart.bLabelEn : chart.bLabel;
  const label = locale === "en" && chart.labelEn ? chart.labelEn : chart.label;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => el.querySelectorAll(".chart__bar").forEach((b) => b.classList.add("is-on"));
    if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // doble rAF para que la transición desde 0 sí se pinte
      requestAnimationFrame(() => requestAnimationFrame(on));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          on();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const isPage = size === "page";
  return (
    <div ref={ref} className={`chartbox chartbox--${size}`}>
      <div className={`label ${isPage ? "label--12" : ""} muted`}>{label}</div>
      <div className="chart chartbox__area">
        <div className="chart__col">
          <div className="num chartbox__val muted">{aText}</div>
          <div className="chart__bar chart__bar--a" style={{ ["--h" as string]: `${aPct}%` }} />
        </div>
        <div className="chart__col">
          <div className="num chartbox__val">{bText}</div>
          <div className="chart__bar chart__bar--b" style={{ ["--h" as string]: "100%" }} />
        </div>
      </div>
      <div className="chart__labels">
        <span>{aLabel}</span>
        <span>{bLabel}</span>
      </div>
    </div>
  );
}
