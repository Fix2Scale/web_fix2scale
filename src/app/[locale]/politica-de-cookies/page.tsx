import { notFound } from "next/navigation";
import { isLocale, pick } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(locale, "/politica-de-cookies", pick(locale, "Política de Cookies", "Cookie Policy"), pick(locale, "Qué cookies usa fix2scale.com, quién las instala, cómo controlarlas y el inventario completo por categoría: necesarias, analíticas, publicitarias y funcionales.", "Which cookies fix2scale.com uses, who sets them, how to control them and the full inventory by category: necessary, analytics, advertising and functional."), { robots: { index: true, follow: true } });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage slug="politica-de-cookies" locale={locale} />;
}
