"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Caso, SectorKey } from "@/lib/content";
import { SECTORS } from "@/lib/content";
import { href, pick, t, type Locale } from "@/lib/i18n";
import { Chart } from "../Chart";
import { Counter } from "../Counter";

type Sector = SectorKey | "todos";

const pad = (n: number) => String(n).padStart(2, "0");

export function CaseSlider({ casos, locale }: { casos: Caso[]; locale: Locale }) {
  const [sector, setSector] = useState<Sector>("todos");
  const [idx, setIdx] = useState(0);
  const list = useMemo(() => (sector === "todos" ? casos : casos.filter((c) => c.sector === sector)), [casos, sector]);
  const n = list.length;
  const cur = list[((idx % n) + n) % n];

  const go = useCallback((d: number) => setIdx((i) => (((i + d) % n) + n) % n), [n]);
  const pickSector = (s: Sector) => {
    setSector(s);
    setIdx(0);
  };

  // Flechas del teclado cuando el slider tiene el foco; swipe táctil.
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  const eyebrow = locale === "en" && cur.eyebrowEn ? cur.eyebrowEn : cur.eyebrow;
  const title = locale === "en" && cur.slideTitleEn ? cur.slideTitleEn : cur.slideTitle;
  const narr = locale === "en" && cur.narrativaEn ? cur.narrativaEn : cur.narrativa;

  return (
    <div className="stack" style={{ gap: "clamp(26px,2.8vw,44px)" }} ref={root}>
      <div className="slider-head">
        <div className="eyebrow-hero eyebrow-hero--dash" style={{ color: "var(--f2s-blue-soft)" }}>
          <span>{pick(locale, "Casos de éxito", "Success stories")}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="num slider-count" aria-live="polite">
            {pad(((idx % n) + n) % n + 1)} / {pad(n)}
          </span>
          <div className="slider-arrows">
            <button type="button" className="slider-arrow" aria-label={pick(locale, "Caso anterior", "Previous case")} onClick={() => go(-1)}>
              ←
            </button>
            <button type="button" className="slider-arrow" aria-label={pick(locale, "Caso siguiente", "Next case")} onClick={() => go(1)}>
              →
            </button>
          </div>
        </div>
      </div>

      <div
        className="slide"
        key={cur.id}
        aria-live="polite"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="slide__left">
          <div className="stack" style={{ gap: 18 }}>
            <span className="label slide__eyebrow">{eyebrow}</span>
            <h3 className="display display--slide" style={{ color: "var(--f2s-white)" }}>
              {title}
            </h3>
            <p className="slide__narr">{narr}</p>
          </div>
          <Link href={href(locale, `/insights/${cur.id}`)} className="link-under link-under--white" style={{ alignSelf: "flex-start" }}>
            {t(locale, "common.seeFullCase")}
          </Link>
        </div>
        <div className="slide__right">
          <Chart chart={cur.chart} locale={locale} size="slide" immediate />
          <div className="slide__metrics">
            {cur.metrics.map((m, i) => (
              <div className="metric" key={i}>
                <div className="num metric__v">
                  {m.n ? (
                    <Counter value={parseFloat(m.n)} dec={parseInt(m.dec ?? "0", 10)} prefix={m.pre} suffix={m.suf} locale={locale} immediate />
                  ) : (
                    m.d
                  )}
                </div>
                <div className="metric__l">{locale === "en" && m.lEn ? m.lEn : m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chips" role="group" aria-label={pick(locale, "Filtrar por sector", "Filter by sector")}>
        <span className="label label--12 muted" style={{ marginRight: 8 }}>
          {pick(locale, "Filtrar por sector", "Filter by sector")}
        </span>
        {SECTORS.map((s) => (
          <button key={s.key} type="button" className="chip-btn" aria-pressed={sector === s.key} onClick={() => pickSector(s.key)}>
            {locale === "en" ? s.en : s.es}
          </button>
        ))}
      </div>
    </div>
  );
}
