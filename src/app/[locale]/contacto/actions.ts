"use server";

import { headers } from "next/headers";
import { SITE } from "@/lib/i18n";

/**
 * Envío del formulario de contacto.
 *
 * Valida en servidor (misma regla que el cliente) y registra la autorización de datos con
 * fecha, hora, IP y versión del texto de la política vigente (Ley 1581 de 2012).
 *
 * Destino: si existe `LEAD_WEBHOOK_URL` (CRM, Make/Zapier, Slack, correo transaccional…),
 * el lead se envía allí como JSON. Si no, se registra en el log del servidor y el envío
 * se marca como recibido para no bloquear al usuario. Pendiente definir el destino final.
 */

export type LeadState = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(_prev: LeadState | null, form: FormData): Promise<LeadState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const locale = get("locale") === "en" ? "en" : "es";
  const data = {
    nombre: get("nombre"),
    apellido: get("apellido"),
    correo: get("correo"),
    organizacion: get("organizacion"),
    sitio: get("sitio"),
    rol: get("rol"),
    reto: get("reto"),
    horario: get("horario"),
  };
  const consent = form.get("consent") === "on";
  const marketing = form.get("marketing") === "on";
  // Honeypot antispam: campo oculto que los humanos no llenan.
  if (get("empresa_web2")) return { ok: true };

  const fieldErrors: Record<string, string> = {};
  const req = (k: keyof typeof data, msgEs: string, msgEn: string) => {
    if (data[k].length < 2) fieldErrors[k] = locale === "en" ? msgEn : msgEs;
  };
  req("nombre", "Escribe tu nombre.", "Add your first name.");
  req("apellido", "Escribe tu apellido.", "Add your last name.");
  req("organizacion", "Escribe tu organización.", "Add your organization.");
  req("rol", "Escribe tu rol.", "Add your role.");
  req("reto", "Cuéntanos en una línea.", "Tell us in one line.");
  if (!EMAIL_RE.test(data.correo)) fieldErrors.correo = locale === "en" ? "Check the email address." : "Revisa el correo.";
  if (data.sitio && (!/\./.test(data.sitio) || /\s/.test(data.sitio))) fieldErrors.sitio = locale === "en" ? "Check the web address." : "Revisa la dirección del sitio.";
  if (!consent) fieldErrors.consent = locale === "en" ? "You need to authorize the processing of your data to continue." : "Necesitamos tu autorización para continuar.";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "").split(",")[0].trim() || "unknown";
  const now = new Date();
  const lead = {
    ...data,
    locale,
    consent: {
      dataProcessing: true,
      marketing,
      timestamp: now.toISOString(),
      ip,
      userAgent: h.get("user-agent") ?? "",
      policyVersion: SITE.privacyPolicyVersion,
      policyUrl: `${SITE.url}/politica-de-privacidad`,
    },
  };

  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", ...(process.env.LEAD_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}) },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (e) {
      console.error("[lead] fallo al enviar al webhook", e);
      return { ok: false, error: locale === "en" ? "We could not send your request. Write to us at info@fix2scale.com." : "No pudimos enviar tu solicitud. Escríbenos a info@fix2scale.com." };
    }
  } else {
    console.info("[lead] LEAD_WEBHOOK_URL no configurado; lead recibido:", JSON.stringify({ ...lead, consent: { ...lead.consent, userAgent: undefined } }));
  }
  return { ok: true };
}
