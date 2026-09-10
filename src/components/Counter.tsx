"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  value: number;
  dec?: number;
  prefix?: string;
  suffix?: string;
  locale: Locale;
  className?: string;
  style?: React.CSSProperties;
  /** Si es true, arranca de inmediato (p. ej. dentro del slider). Si no, al entrar en viewport. */
  immediate?: boolean;
};

/** Formato colombiano en ES (punto de miles, coma decimal); en EN, al revés. */
export function fmt(n: number, dec: number, locale: Locale): string {
  const s = n.toFixed(dec);
  const es = locale === "es";
  const [i, d] = s.split(".");
  const int = i.replace(/\B(?=(\d{3})+(?!\d))/g, es ? "." : ",");
  return d ? int + (es ? "," : ".") + d : int;
}

export function Counter({ value, dec = 0, prefix = "", suffix = "", locale, className, style, immediate }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = prefix + fmt(value, dec, locale) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = final;
      return;
    }
    let raf = 0;
    const run = () => {
      const dur = 620;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = prefix + fmt(value * (1 - Math.pow(1 - p, 3)), dec, locale) + suffix;
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = final;
      };
      raf = requestAnimationFrame(tick);
    };
    if (immediate) {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, dec, prefix, suffix, locale, final, immediate]);

  return (
    <span ref={ref} className={className} style={style}>
      {final}
    </span>
  );
}
