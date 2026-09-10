import Link from "next/link";
import { href, SITE, t, type Locale } from "@/lib/i18n";
import { CookiePrefsLink } from "./CookieConsent";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="stack" style={{ gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/f2s-horizontal-color-tight.svg" alt="Fix 2 Scale" style={{ height: 22, alignSelf: "flex-start" }} />
          <span className="muted" style={{ fontSize: 13 }}>
            {t(locale, "footer.city")}
          </span>
        </div>
        <div className="footer__col">
          <span className="label label--12 muted">{t(locale, "footer.site")}</span>
          <Link href={href(locale, "/servicios")}>{t(locale, "nav.services")}</Link>
          <Link href={href(locale, "/quienes-somos")}>{t(locale, "nav.about")}</Link>
          <Link href={href(locale, "/insights")}>{t(locale, "footer.insights")}</Link>
        </div>
        <div className="footer__col">
          <span className="label label--12 muted">{t(locale, "footer.contact")}</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <div className="footer__col">
          <span className="label label--12 muted">{t(locale, "footer.legal")}</span>
          <Link href={href(locale, "/politica-de-privacidad")}>{t(locale, "footer.privacy")}</Link>
          <Link href={href(locale, "/politica-de-cookies")}>{t(locale, "footer.cookies")}</Link>
          <Link href={href(locale, "/terminos-de-uso")}>{t(locale, "footer.terms")}</Link>
          <CookiePrefsLink locale={locale} />
        </div>
      </div>
    </footer>
  );
}
