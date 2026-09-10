"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { href, pick, type Locale } from "@/lib/i18n";
import { submitLead, type LeadState } from "@/app/[locale]/contacto/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = "nombre" | "apellido" | "correo" | "organizacion" | "sitio" | "rol" | "reto" | "horario";

const LABELS: Record<FieldKey, [string, string]> = {
  nombre: ["Nombre", "First name"],
  apellido: ["Apellido", "Last name"],
  correo: ["Correo", "Email"],
  organizacion: ["Organización", "Organization"],
  sitio: ["Sitio web de la empresa · opcional", "Company website · optional"],
  rol: ["Rol", "Role"],
  reto: ["¿Qué está limitando tu crecimiento?", "What is limiting your growth?"],
  horario: ["Fecha y hora preferida para la llamada", "Preferred date and time for the call"],
};
const ERRORS: Record<FieldKey, [string, string]> = {
  nombre: ["Escribe tu nombre.", "Add your first name."],
  apellido: ["Escribe tu apellido.", "Add your last name."],
  correo: ["Revisa el correo.", "Check the email address."],
  organizacion: ["Escribe tu organización.", "Add your organization."],
  sitio: ["Revisa la dirección del sitio.", "Check the web address."],
  rol: ["Escribe tu rol.", "Add your role."],
  reto: ["Cuéntanos en una línea.", "Tell us in one line."],
  horario: ["Elige una fecha y hora.", "Pick a date and time."],
};

function validate(k: FieldKey, v: string): boolean {
  const s = v.trim();
  if (k === "correo") return EMAIL_RE.test(s);
  if (k === "sitio") return !s || (/\./.test(s) && !/\s/.test(s));
  if (k === "horario") return !!s;
  return s.length > 1;
}

type FieldProps = {
  k: FieldKey;
  locale: Locale;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  textarea?: boolean;
  min?: string;
  error: boolean;
  serverError?: string;
  disabled: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

/** Campo sin caja: solo línea inferior, error en línea de 12px cobalto. */
function Field({ k, locale, type = "text", autoComplete, placeholder, textarea, min, error, serverError, disabled, onBlur, onInput }: FieldProps) {
  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span className="label field__label">{pick(locale, ...LABELS[k])}</span>
      {textarea ? (
        <textarea name={k} rows={4} onBlur={onBlur} onInput={onInput} disabled={disabled} aria-invalid={error} aria-describedby={`${k}-err`} />
      ) : (
        <input name={k} type={type} autoComplete={autoComplete} placeholder={placeholder} min={min} onBlur={onBlur} onInput={onInput} disabled={disabled} aria-invalid={error} aria-describedby={`${k}-err`} />
      )}
      <span className="field__err" id={`${k}-err`}>
        {serverError ?? pick(locale, ...ERRORS[k])}
      </span>
    </label>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState<LeadState | null, FormData>(submitLead, null);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [consentErr, setConsentErr] = useState(false);
  const done = state?.ok === true;

  const serverErr = (k: string) => state?.fieldErrors?.[k];
  const hasErr = (k: FieldKey) => !!errors[k] || !!serverErr(k);

  const onBlur = (k: FieldKey) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setErrors((s) => ({ ...s, [k]: !validate(k, e.target.value) }));
  const onInput = (k: FieldKey) => (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errors[k] && validate(k, (e.target as HTMLInputElement).value)) setErrors((s) => ({ ...s, [k]: false }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget;
    const next: Partial<Record<FieldKey, boolean>> = {};
    let ok = true;
    (Object.keys(LABELS) as FieldKey[]).forEach((k) => {
      const el = f.elements.namedItem(k) as HTMLInputElement | HTMLTextAreaElement | null;
      const bad = !validate(k, el?.value ?? "");
      next[k] = bad;
      if (bad) ok = false;
    });
    const consent = (f.elements.namedItem("consent") as HTMLInputElement | null)?.checked;
    setConsentErr(!consent);
    setErrors(next);
    if (!ok || !consent) {
      e.preventDefault();
      const first = (Object.keys(next) as FieldKey[]).find((k) => next[k]);
      const el = first ? (f.elements.namedItem(first) as HTMLElement | null) : (f.elements.namedItem("consent") as HTMLElement | null);
      el?.focus();
    }
  };

  const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 16);
  const common = (k: FieldKey) => ({ k, locale, error: hasErr(k), serverError: serverErr(k), disabled: done, onBlur: onBlur(k), onInput: onInput(k) });

  return (
    <form className="form" action={action} onSubmit={onSubmit} noValidate>
      <span className="eyebrow eyebrow--plain">{pick(locale, "Solicita un diagnóstico", "Request a discovery call")}</span>
      <input type="hidden" name="locale" value={locale} />
      {/* honeypot antispam */}
      <input type="text" name="empresa_web2" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />

      <div className="form__row">
        <Field {...common("nombre")} autoComplete="given-name" />
        <Field {...common("apellido")} autoComplete="family-name" />
      </div>
      <Field {...common("correo")} type="email" autoComplete="email" />
      <Field {...common("organizacion")} autoComplete="organization" />
      <Field {...common("sitio")} type="url" autoComplete="url" placeholder="fix2scale.com" />
      <Field {...common("rol")} autoComplete="organization-title" />
      <Field {...common("reto")} textarea />
      <Field {...common("horario")} type="datetime-local" min={minDate} />

      <div className="consents">
        <label className="consent">
          <input type="checkbox" name="consent" disabled={done} onChange={(e) => e.target.checked && setConsentErr(false)} aria-describedby="consent-err" />
          <span>
            {pick(locale, "Autorizo a Fix 2 Scale SAS a tratar mis datos personales conforme a su ", "I authorize Fix 2 Scale SAS to process my personal data in accordance with its ")}
            <Link href={href(locale, "/politica-de-privacidad")} className="link-inline">
              {pick(locale, "Política de Tratamiento de Datos Personales", "Personal Data Processing Policy")}
            </Link>
            {pick(locale, ", incluida su transferencia internacional a los proveedores allí señalados, para atender mi solicitud y contactarme sobre sus servicios.", ", including its international transfer to the providers listed therein, in order to handle my request and contact me about its services.")}
          </span>
        </label>
        {(consentErr || serverErr("consent")) && (
          <span className="form__error" id="consent-err" role="alert">
            {serverErr("consent") ?? pick(locale, "Necesitamos tu autorización para continuar.", "You need to authorize the processing of your data to continue.")}
          </span>
        )}
        <label className="consent">
          <input type="checkbox" name="marketing" disabled={done} />
          <span>{pick(locale, "Quiero recibir contenido y análisis de Fix 2 Scale sobre crecimiento comercial. Puedo darme de baja cuando quiera.", "I want to receive content and analysis from Fix 2 Scale on commercial growth. I can unsubscribe at any time.")}</span>
        </label>
      </div>

      {!done && (
        <button type="submit" className="btn btn--form" disabled={pending} style={{ alignSelf: "flex-start" }}>
          {pending ? pick(locale, "Enviando…", "Sending…") : pick(locale, "Agenda un diagnóstico", "Book a discovery call")}
        </button>
      )}
      {state?.error && (
        <span className="form__error" role="alert">
          {state.error}
        </span>
      )}
      {!done && (
        <span className="form__note">
          {pick(locale, "Tus datos se tratan conforme a nuestra ", "Your data is processed in accordance with our ")}
          <Link href={href(locale, "/politica-de-privacidad")} className="link-inline">
            {pick(locale, "Política de Privacidad", "Privacy Policy")}
          </Link>
          {pick(locale, ". No los compartimos con terceros para fines comerciales.", ". We do not share it with third parties for commercial purposes.")}
        </span>
      )}
      {done && (
        <div className="form__done" role="status">
          <span className="form__done-t">{pick(locale, "Solicitud recibida.", "Request received.")}</span>
          <span style={{ fontSize: 14, color: "var(--f2s-on-dark-2)" }}>{pick(locale, "Te responde uno de los dos socios en menos de 48 horas, directamente.", "One of the two partners replies within 48 hours, directly.")}</span>
        </div>
      )}
    </form>
  );
}
