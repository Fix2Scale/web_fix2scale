import { notFound } from "next/navigation";
import { isLocale, pick } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMeta(locale, "/politica-de-privacidad", pick(locale, "Política de Tratamiento de Datos Personales", "Personal Data Processing Policy"), pick(locale, "Cómo Fix 2 Scale SAS recolecta, usa y protege los datos personales conforme a la Ley 1581 de 2012: finalidades, derechos del titular, encargados y transferencia internacional.", "How Fix 2 Scale SAS collects, uses and protects personal data under Colombian Law 1581 of 2012: purposes, data subject rights, processors and international transfers."), { robots: { index: true, follow: true } });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage slug="politica-de-privacidad" locale={locale} />;
}
