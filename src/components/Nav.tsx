"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, switchLocalePath, t, type Locale } from "@/lib/i18n";

const ITEMS: { key: "home" | "services" | "about" | "insights" | "contact"; path: string }[] = [
  { key: "home", path: "/" },
  { key: "services", path: "/servicios" },
  { key: "about", path: "/quienes-somos" },
  { key: "insights", path: "/insights" },
  { key: "contact", path: "/contacto" },
];

function isActive(pathname: string, locale: Locale, path: string) {
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  if (path === "/") return base === "/";
  return base === path || base.startsWith(path + "/");
}

export function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [dense, setDense] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setDense((window.scrollY || 0) > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al navegar.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <>
      <header id="f2s-nav" className={`nav ${dense ? "nav--dense" : ""}`}>
        <div className="nav__wrap">
          <Link href={href(locale, "/")} className="nav__logo" aria-label="Fix 2 Scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/f2s-horizontal-color-tight.svg" alt="Fix 2 Scale" />
          </Link>
          <nav className="nav__links" aria-label={t(locale, "nav.menu")}>
            {ITEMS.map((it) => (
              <Link
                key={it.key}
                href={href(locale, it.path)}
                className={isActive(pathname, locale, it.path) ? "is-active" : ""}
                aria-current={isActive(pathname, locale, it.path) ? "page" : undefined}
              >
                {t(locale, `nav.${it.key}`)}
              </Link>
            ))}
          </nav>
          <div className="nav__lang" role="group" aria-label="Idioma / Language">
            <Link href={switchLocalePath(pathname, "es")} className={locale === "es" ? "is-on" : ""} hrefLang="es" lang="es" aria-current={locale === "es" ? "true" : undefined}>
              ES
            </Link>
            <Link href={switchLocalePath(pathname, "en")} className={locale === "en" ? "is-on" : ""} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>
              EN
            </Link>
          </div>
          <Link href={href(locale, "/contacto")} className="btn btn--nav nav__cta">
            {t(locale, "nav.cta")}
          </Link>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? t(locale, "nav.close") : t(locale, "nav.menu")}
            aria-expanded={open}
            aria-controls="f2s-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="#0a0a0a" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M2 1l14 10M16 1L2 11" /> : <path d="M0 1h18M0 6h18M0 11h18" />}
            </svg>
          </button>
        </div>
      </header>
      <div id="f2s-menu" className={`menu ${open ? "is-open" : ""}`} hidden={!open}>
        {ITEMS.map((it) => (
          <Link key={it.key} href={href(locale, it.path)}>
            {t(locale, `nav.${it.key}`)}
          </Link>
        ))}
        <Link href={switchLocalePath(pathname, other)} className="menu__lang" hrefLang={other} lang={other}>
          {other === "en" ? "English" : "Español"} →
        </Link>
      </div>
    </>
  );
}
