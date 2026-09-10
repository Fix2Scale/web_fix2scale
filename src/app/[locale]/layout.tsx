import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { isLocale, LOCALES, SITE } from "@/lib/i18n";
import "../globals.css";
import "../components.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Fix 2 Scale", template: "%s · Fix 2 Scale" },
  description:
    "Consultoría estratégica de Growth, Marketing y Ventas. Identificamos qué limita tu crecimiento y construimos el modelo comercial para escalarlo.",
  icons: { icon: [{ url: "/favicon-32.png", sizes: "32x32" }, { url: "/icon-512.png", sizes: "512x512" }] },
  openGraph: { siteName: "Fix 2 Scale", type: "website" },
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <a href="#main" className="skip">
          {locale === "en" ? "Skip to content" : "Ir al contenido"}
        </a>
        <Nav locale={locale} />
        <main id="main" className="main">
          {children}
        </main>
        <Footer locale={locale} />
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
