"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { href, t, type Locale } from "@/lib/i18n";

/**
 * Panel de consentimiento de cookies (exigido por la Política de Cookies §3).
 * Guarda la decisión por categoría en la cookie `f2s_consent` durante 6 meses.
 * Las etiquetas analíticas/publicitarias deben leer esta cookie antes de cargar.
 */

export type Consent = { analytics: boolean; ads: boolean; functional: boolean; ts: number };
const COOKIE = "f2s_consent";
const MAX_AGE = 60 * 60 * 24 * 182; // 6 meses

export function readConsent(): Consent | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
    if (!m) return null;
    const v = JSON.parse(decodeURIComponent(m[1]));
    if (typeof v !== "object" || v === null) return null;
    return v as Consent;
  } catch {
    return null;
  }
}

function writeConsent(c: Omit<Consent, "ts">) {
  const value: Consent = { ...c, ts: Date.now() };
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  window.dispatchEvent(new CustomEvent("f2s:consent", { detail: value }));
}

const OPEN_EVENT = "f2s:open-cookie-prefs";

export function CookiePrefsLink({ locale }: { locale: Locale }) {
  return (
    <button type="button" className="footer__prefs" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {t(locale, "footer.cookiePrefs")}
    </button>
  );
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, ads: false, functional: false });

  useEffect(() => {
    const saved = readConsent();
    if (!saved) setVisible(true);
    else setPrefs({ analytics: saved.analytics, ads: saved.ads, functional: saved.functional });
    const open = () => {
      const s = readConsent();
      if (s) setPrefs({ analytics: s.analytics, ads: s.ads, functional: s.functional });
      setConfiguring(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const finish = useCallback((c: Omit<Consent, "ts">) => {
    writeConsent(c);
    setVisible(false);
    setConfiguring(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <div className="cookie__inner">
        <div className="stack" style={{ gap: 10, minWidth: 0 }}>
          <span id="cookie-title" className="label label--12" style={{ color: "var(--f2s-blue-soft)" }}>
            {t(locale, "cookies.title")}
          </span>
          <p className="cookie__body">
            {t(locale, "cookies.body")}{" "}
            <Link href={href(locale, "/politica-de-cookies")} className="cookie__link">
              {t(locale, "cookies.policy")}
            </Link>
          </p>
          {configuring && (
            <div className="cookie__opts">
              <label className="cookie__opt">
                <input type="checkbox" checked disabled />
                <span>
                  {t(locale, "cookies.necessary")} <em>· {t(locale, "cookies.necessaryNote")}</em>
                </span>
              </label>
              <label className="cookie__opt">
                <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} />
                <span>{t(locale, "cookies.analytics")}</span>
              </label>
              <label className="cookie__opt">
                <input type="checkbox" checked={prefs.ads} onChange={(e) => setPrefs({ ...prefs, ads: e.target.checked })} />
                <span>{t(locale, "cookies.ads")}</span>
              </label>
              <label className="cookie__opt">
                <input type="checkbox" checked={prefs.functional} onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })} />
                <span>{t(locale, "cookies.functional")}</span>
              </label>
            </div>
          )}
        </div>
        <div className="cookie__actions">
          {configuring ? (
            <button type="button" className="btn btn--sm" onClick={() => finish(prefs)}>
              {t(locale, "cookies.save")}
            </button>
          ) : (
            <>
              <button type="button" className="btn btn--sm" onClick={() => finish({ analytics: true, ads: true, functional: true })}>
                {t(locale, "cookies.acceptAll")}
              </button>
              <button type="button" className="cookie__ghost" onClick={() => finish({ analytics: false, ads: false, functional: false })}>
                {t(locale, "cookies.rejectAll")}
              </button>
              <button type="button" className="cookie__ghost" onClick={() => setConfiguring(true)}>
                {t(locale, "cookies.configure")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
