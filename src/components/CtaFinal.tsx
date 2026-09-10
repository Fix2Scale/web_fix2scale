import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function CtaFinal({ locale, alt }: { locale: Locale; alt?: boolean }) {
  return (
    <section className={`section ${alt ? "section--alt" : ""}`} style={alt ? { borderBottom: 0 } : undefined}>
      <Reveal className="wrap grid-2" style={{ alignItems: "center" }}>
        <h2 className="display display--h2-cta min0">{t(locale, "cta.title")}</h2>
        <div className="stack min0" style={{ gap: 26 }}>
          <p className="lead" style={{ fontSize: "clamp(16px,1.3vw,20px)", maxWidth: "50ch" }}>
            {t(locale, "cta.body")}
          </p>
          <Link href={href(locale, "/contacto")} className="btn btn--cta" style={{ alignSelf: "flex-start" }}>
            {t(locale, "cta.button")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
