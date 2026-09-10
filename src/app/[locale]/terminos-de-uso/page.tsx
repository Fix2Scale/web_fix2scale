import { notFound } from "next/navigation";
import { isLocale, pick } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(locale, "/terminos-de-uso", pick(locale, "Términos de Uso", "Terms of Use"), pick(locale, "Condiciones de acceso y uso de fix2scale.com: naturaleza del contenido, uso permitido, propiedad intelectual, recursos descargables y ley aplicable.", "Conditions for accessing and using fix2scale.com: nature of the content, permitted use, intellectual property, downloadable resources and governing law."), { robots: { index: true, follow: true } });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage slug="terminos-de-uso" locale={locale} />;
}
