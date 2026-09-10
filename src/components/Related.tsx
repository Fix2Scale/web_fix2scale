import type { Entry } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { EntryRow } from "./EntryCard";
import { Reveal } from "./Reveal";

export function Related({ entries, locale }: { entries: Entry[]; locale: Locale }) {
  return (
    <section className="section--alt" style={{ padding: "clamp(44px,5vw,88px) var(--pad-x)", borderBottom: 0 }}>
      <div className="wrap stack" style={{ gap: "clamp(24px,2.6vw,40px)" }}>
        <Reveal as="span" className="label label--12" style={{ color: "var(--f2s-blue)" }}>
          {t(locale, "common.keepReading")}
        </Reveal>
        <div className="related-grid">
          {entries.map((e, i) => (
            <Reveal key={e.id} delay={i * 90}>
              <EntryRow entry={e} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
