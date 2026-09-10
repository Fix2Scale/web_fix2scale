import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap stack" style={{ gap: 24 }}>
        <div className="eyebrow-hero">404</div>
        <h1 className="display display--h1">Esta página no existe.</h1>
        <p className="lead" style={{ maxWidth: "56ch" }}>
          Puede que el enlace haya cambiado. Vuelve al inicio o revisa los casos y artículos en Insights.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <Link href="/" className="btn btn--hero">Ir al inicio</Link>
          <Link href="/insights" className="link-under">Insights y Recursos</Link>
        </div>
      </div>
    </section>
  );
}
