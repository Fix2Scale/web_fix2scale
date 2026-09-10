"use client";

import { useEffect, useState } from "react";

/** Índice lateral pegajoso: salta a cada sección y marca la sección visible. */
export function TocNav({ title, items }: { title: string; items: { id: string; text: string }[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((x): x is HTMLElement => !!x);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setCurrent(vis[0].target.id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label={title}>
      <span className="label muted">{title}</span>
      <div className="toc__list">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            className={current === i.id ? "is-current" : ""}
            onClick={(e) => {
              const el = document.getElementById(i.id);
              if (!el) return;
              e.preventDefault();
              const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              const y = el.getBoundingClientRect().top + window.pageYOffset - 116;
              window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
              history.replaceState(null, "", `#${i.id}`);
            }}
          >
            {i.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
