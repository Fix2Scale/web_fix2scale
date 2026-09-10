import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/content";
import { getLegal, type LegalDoc } from "@/lib/content.server";
import { href, SITE, t, type Locale } from "@/lib/i18n";
import { TocNav } from "./TocNav";

const OTHERS: { slug: LegalDoc["slug"]; es: string; en: string }[] = [
  { slug: "politica-de-privacidad", es: "Política de Privacidad", en: "Privacy Policy" },
  { slug: "politica-de-cookies", es: "Política de Cookies", en: "Cookie Policy" },
  { slug: "terminos-de-uso", es: "Términos de Uso", en: "Terms of Use" },
];

function textOf(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in children) return textOf((children as { props: { children?: React.ReactNode } }).props.children);
  return "";
}

/** Página legal renderizada desde Markdown editable (content/legal/*.md). */
export function LegalPage({ slug, locale }: { slug: LegalDoc["slug"]; locale: Locale }) {
  const doc = getLegal(slug);
  return (
    <>
      <section style={{ padding: "clamp(40px,5vw,86px) var(--pad-x) clamp(28px,3vw,44px)", borderBottom: "1px solid var(--f2s-gray-200)" }}>
        <div className="wrap stack" style={{ gap: 20 }}>
          <div className="eyebrow-hero hero-in">Legal</div>
          <h1 className="display display--h1-legal hero-in" style={{ animationDelay: "95ms" }}>
            {doc.title}
          </h1>
          <div className="entry-meta label muted hero-in" style={{ animationDelay: "190ms" }}>
            <span>{SITE.legalName}</span>
            <span>·</span>
            <span>
              {locale === "en" ? "Effective from" : "Vigente desde"}: {doc.effective}
            </span>
            <span>·</span>
            <span>
              {locale === "en" ? "Version" : "Versión"} {doc.version}
            </span>
          </div>
          {locale === "en" && <p className="es-only hero-in">{t(locale, "common.esOnly")}</p>}
        </div>
      </section>

      <section style={{ padding: "clamp(34px,4vw,64px) var(--pad-x) clamp(44px,5vw,88px)" }}>
        <div className="wrap art-layout">
          <TocNav title={t(locale, "common.contents")} items={doc.toc} />
          <div className="art-col art-col--legal legal-md">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 id={slugifyHeading(textOf(children))} className="display display--h2-legal">
                    {children}
                  </h2>
                ),
                thead: ({ children }) => (textOf(children).trim() ? <thead>{children}</thead> : null),
                table: ({ children }) => (
                  <div className="tbl-wrap">
                    <table className="tbl">{children}</table>
                  </div>
                ),
                a: ({ href: h, children }) => {
                  const internal = h?.startsWith("/");
                  return internal ? <Link href={href(locale, h!)}>{children}</Link> : <a href={h}>{children}</a>;
                },
              }}
            >
              {doc.body}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      <section className="section--alt" style={{ padding: "clamp(36px,4vw,64px) var(--pad-x)", borderBottom: 0 }}>
        <div className="wrap legal-foot">
          <span className="label muted">{t(locale, "common.otherDocs")}</span>
          {OTHERS.filter((o) => o.slug !== slug).map((o) => (
            <Link key={o.slug} href={href(locale, `/${o.slug}`)} className="legal-foot__link">
              {locale === "en" ? o.en : o.es}
              <span style={{ fontSize: 13, lineHeight: 1 }} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
          <a href={`mailto:${SITE.email}`} style={{ marginLeft: "auto", fontSize: 14 }}>
            {SITE.email}
          </a>
        </div>
      </section>
    </>
  );
}
