# Sitio web Fix 2 Scale

Sitio de marketing bilingüe (ES/EN) construido con Next.js 16 (App Router) a partir del
handoff de diseño `F2S_Dev Handoff` y del design system `fix2scale-design-system`.

## Arrancar

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

Variables de entorno: ver `.env.example`.

## Rutas

El español no lleva prefijo; el inglés vive bajo `/en/...` (rewrite interno a `app/[locale]`).

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/servicios` | Servicios |
| `/quienes-somos` | Quiénes Somos |
| `/insights` | Parrilla de Insights y Recursos |
| `/insights/<slug>` | Caso de éxito o artículo (plantilla por tipo) |
| `/contacto` | Contacto y formulario |
| `/politica-de-privacidad`, `/politica-de-cookies`, `/terminos-de-uso` | Legales |

Alias históricos `/caso-universidad` y `/resultados` responden 301 a la ruta nueva.

## Contenido (no hardcodeado)

- **Casos de éxito:** `content/casos.json`. Fuente de verdad de cifras, textos y slugs.
  Para sumar un caso: agrega el objeto al JSON y su slug a `INSIGHTS_ORDER` en `src/lib/content.ts`.
  Título y meta SEO por caso en `CASE_SEO` (mismo archivo).
- **Artículos:** `content/articulos/<slug>.ts` como bloques tipados (`p`, `h2`, `h3`, `callout`,
  `figure`, `ul`, `table`, `cta`). Regístralo en `content/articulos/index.ts` y en `INSIGHTS_ORDER`.
- **Legales:** `content/legal/*.md` (Markdown editable). El índice lateral se genera de los `##`.
- **Imágenes de caso (pendientes):** colocar en `public/images/casos/` como
  `<slug>-thumb.jpg` (386×437, mín. 1160×1350) y `<slug>-hero.jpg` (21:9, mín. 2400×1030).
  Mientras no existan se muestra un recuadro con la especificación.
- **Chrome y strings cortos:** diccionario en `src/lib/i18n.ts`. El cuerpo largo de casos,
  artículos y legales está solo en español; en `/en` se muestra con un aviso.

## Formulario de contacto

`src/app/[locale]/contacto/actions.ts` valida en servidor y registra la autorización de datos
con fecha, hora, IP y versión de la política (Ley 1581 de 2012). Si `LEAD_WEBHOOK_URL` está
definido, envía el lead como JSON; si no, lo escribe en el log del servidor. Incluye honeypot
antispam. El destino final (CRM o correo) queda por definir.

## Cookies

Panel de consentimiento (`src/components/CookieConsent.tsx`) con aceptar / rechazar / configurar,
cookie `f2s_consent` por 6 meses y enlace "Preferencias de cookies" en el pie. Las etiquetas
analíticas y publicitarias deben leer esa cookie antes de cargar (aún no hay etiquetas instaladas).

## Tokens

`src/app/globals.css` declara las fuentes variables (Roboto wdth 75 / Plus Jakarta Sans) y los
tokens de color, espacio y movimiento del design system. `src/app/components.css` tiene los
estilos de componentes.
