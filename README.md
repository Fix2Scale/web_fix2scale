<p align="center">
  <img src="public/logo/f2s-horizontal-color.svg" alt="Fix 2 Scale" width="260">
</p>

<h1 align="center">Sitio web Fix 2 Scale</h1>

<p align="center">
  Consultoría estratégica de Growth, Marketing y Ventas.<br>
  <em>Identificamos qué limita tu crecimiento y construimos el modelo comercial para escalarlo.</em>
</p>

<p align="center">
  <a href="https://nextjs.org">Next.js 16</a> ·
  TypeScript ·
  React 19 ·
  Español / English ·
  Sin Tailwind, sin CMS: tokens y contenido en el repo
</p>

---

## Índice

1. [Arranque rápido](#arranque-rápido)
2. [Qué hay dentro](#qué-hay-dentro)
3. [Rutas](#rutas)
4. [Modelo de contenido](#modelo-de-contenido)
5. [Cómo agregar contenido](#cómo-agregar-contenido)
6. [Formulario de contacto](#formulario-de-contacto)
7. [Cookies y consentimiento](#cookies-y-consentimiento)
8. [Diseño y tokens](#diseño-y-tokens)
9. [Variables de entorno](#variables-de-entorno)
10. [Despliegue](#despliegue)
11. [Pendientes](#pendientes)

---

## Arranque rápido

Requisitos: Node 20 o superior y pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Build de producción:

```bash
pnpm build
pnpm start
```

Copia `.env.example` a `.env.local` y ajusta los valores (ver [Variables de entorno](#variables-de-entorno)).

---

## Qué hay dentro

El sitio se construyó a partir del handoff de diseño (`F2S_Dev Handoff`) y del design system
[`fix2scale-design-system`](https://github.com/fjimenez9169/fix2scale-design-system), con fidelidad
alta a colores, tipografía, espaciado, estados e interacciones.

| Área | Qué incluye |
|---|---|
| **Inicio** | Hero, banda de cifras en marquesina, diagnóstico interactivo de síntomas, tarjetas giratorias, stepper del método, bento del motor comercial, **slider de casos** con filtro por sector, FAQ y CTA. |
| **Servicios** | Motor comercial en dos tracks con etapas interactivas, método aplicado y CTA. |
| **Quiénes Somos** | Perfiles de los dos Senior Partners con enlaces a LinkedIn. |
| **Insights** | Parrilla con filtro por tipo (todo / artículos / casos), plantilla de caso de éxito y plantilla de artículo con índice lateral. |
| **Contacto** | Dos formas de empezar (calendario y formulario), formulario con validación y registro de consentimiento. |
| **Legales** | Política de datos, cookies y términos, editables en Markdown, con índice pegajoso. |
| **Transversal** | Nav compacta al scroll, menú móvil, conmutador ES/EN, reveals al scroll, contadores y gráficos animados, panel de cookies, `prefers-reduced-motion`. |

```
src/
├── app/
│   ├── [locale]/            ← todas las páginas (es | en)
│   │   ├── page.tsx         ← Inicio
│   │   ├── servicios/       ├── quienes-somos/     ├── contacto/
│   │   ├── insights/        ← parrilla + [slug] (caso o artículo)
│   │   ├── politica-de-privacidad/  politica-de-cookies/  terminos-de-uso/
│   │   ├── layout.tsx       ← html/lang, nav, footer, cookies
│   │   └── template.tsx     ← fundido entre páginas
│   ├── globals.css          ← fuentes, tokens y primitivas
│   ├── components.css       ← estilos de componentes
│   ├── sitemap.ts · robots.ts
├── components/              ← UI (server y client components)
└── lib/
    ├── i18n.ts              ← locales, rutas, diccionario de chrome
    ├── content.ts           ← tipos, casos, índice de Insights
    ├── content.server.ts    ← helpers con acceso a disco (imágenes, legales)
    └── seo.ts               ← metadatos, canonical y hreflang
content/
├── casos.json               ← los 7 casos (fuente de verdad de cifras)
├── articulos/               ← artículos como bloques tipados
└── legal/                   ← Markdown editable
public/
├── fonts/ · logo/ · images/
```

---

## Rutas

El **español no lleva prefijo**; el inglés vive bajo **`/en/…`**. Internamente todo se resuelve en
`app/[locale]` mediante un rewrite, y cada página emite `canonical` y `hreflang` para ambos idiomas.

| Ruta | Pantalla | Tipo |
|---|---|---|
| `/` | Inicio | Estática |
| `/servicios` | Servicios | Estática |
| `/quienes-somos` | Quiénes Somos | Estática |
| `/insights` | Insights y Recursos | Índice |
| `/insights/<slug>` | Caso de éxito o artículo | Plantilla por tipo |
| `/contacto` | Contacto | Estática + acción de servidor |
| `/politica-de-privacidad` | Política de Tratamiento de Datos Personales | Legal |
| `/politica-de-cookies` | Política de Cookies | Legal |
| `/terminos-de-uso` | Términos de Uso | Legal |

Alias históricos con **301**: `/caso-universidad` → caso de la universidad, `/resultados` → `/insights`.
`/es/…` redirige a la ruta sin prefijo para evitar URLs duplicadas.

---

## Modelo de contenido

Insights está pensado para crecer, así que **nada está hardcodeado en las páginas**. Hay dos tipos:

### `caso` · `content/casos.json`

Fuente de verdad de cifras, textos y slugs. Cada caso alimenta a la vez el slider del Inicio, la
tarjeta de la parrilla y la página completa.

```jsonc
{
  "id": "universidad-recupera-control-motor-comercial",   // slug de la URL
  "sector": "educacion",                                   // chip del filtro
  "chip": "Educación superior", "chipEn": "Higher education",
  "min": 8,                                                // minutos de lectura
  "eyebrow": "...", "slideTitle": "...", "title": "...",
  "narrativa": "...", "bajada": "...", "excerpt": "...",
  "chart": { "label": "...", "a": 375, "b": 435, "aLabel": "Antes", "bLabel": "Después" },
  "metrics": [ { "d": "+16%", "n": "16", "pre": "+", "suf": "%", "l": "matrículas..." } ],
  "reto": ["..."], "hicimos": ["..."], "resultados": "...",
  "nota": "Proyección...",                                 // opcional, se rotula como proyección
  "quote": "...", "porque": "..."
}
```

### `articulo` · `content/articulos/<slug>.ts`

Bloques tipados que la plantilla renderiza en orden:

| Bloque | Uso |
|---|---|
| `p` | Párrafo (admite HTML inline para enlaces) |
| `h2` | Título numerado; entra al índice lateral |
| `h3` | Subtítulo (p. ej. preguntas frecuentes) |
| `callout` | Caja gris con borde negro y etiqueta ("La respuesta corta") |
| `figure` | Imagen 3:2 con pie; muestra placeholder si no hay `src` |
| `ul` | Lista |
| `table` | Tabla con encabezado negro y borde de 2px |
| `cta` | Bloque negro con etiqueta lima y botón a Contacto |

### Legales · `content/legal/*.md`

Markdown estándar (con tablas). El encabezado del documento aporta título, vigencia y versión; el
índice lateral se genera de los `##`.

---

## Cómo agregar contenido

**Un caso nuevo**

1. Agrega el objeto a `content/casos.json` en la posición que quieras en el slider.
2. Suma su `id` a `INSIGHTS_ORDER` en `src/lib/content.ts` (orden de la parrilla).
3. Añade título y meta description en `CASE_SEO` (mismo archivo).
4. Deja las imágenes en `public/images/casos/`:
   `<slug>-thumb.jpg` (386×437, mín. 1160×1350) y `<slug>-hero.jpg` (21:9, mín. 2400×1030).
   Mientras no existan, se muestra un recuadro con la especificación.

**Un artículo nuevo**

1. Crea `content/articulos/<slug>.ts` exportando un `Articulo`.
2. Regístralo en `content/articulos/index.ts` y en `INSIGHTS_ORDER`.
3. Coloca miniatura (386×437) y banner en `public/images/insights/`.

**Textos de chrome** (navegación, botones, etiquetas): diccionario en `src/lib/i18n.ts`.

> El cuerpo largo de casos, artículos y legales existe hoy solo en español; en `/en` se muestra con
> un aviso hasta que llegue la traducción.

---

## Formulario de contacto

`src/app/[locale]/contacto/actions.ts` es una acción de servidor que:

- valida con las mismas reglas que el cliente (requeridos, patrón de correo, sitio web opcional);
- exige la **casilla de autorización de datos** (desmarcada por defecto) y guarda la de
  comunicaciones comerciales por separado;
- registra la autorización con **fecha, hora, IP y versión del texto de la política**
  (Ley 1581 de 2012);
- incluye un honeypot antispam.

Si `LEAD_WEBHOOK_URL` está definido, el lead se envía como JSON a esa URL (CRM, Make, Zapier,
Slack, correo transaccional). Si no, se escribe en el log del servidor y el usuario ve la
confirmación igual.

---

## Cookies y consentimiento

`src/components/CookieConsent.tsx` implementa el panel que exige la Política de Cookies:
**Aceptar todas · Rechazar todas · Configurar** por categoría. La decisión se guarda en la cookie
`f2s_consent` durante 6 meses y se puede cambiar desde **Preferencias de cookies** en el pie.

Cuando se instalen etiquetas (GA4, Ads, Meta, LinkedIn), deben leer esa cookie antes de cargar.
El panel emite el evento `f2s:consent` en `window` cada vez que cambia la decisión.

---

## Diseño y tokens

Todo color, tamaño, espacio y curva de movimiento sale de las variables de `src/app/globals.css`,
tomadas del design system. Reglas que el código respeta:

- Dos familias: **Roboto** variable en `wdth 75 / wght 900` para display (caja alta) y
  **Plus Jakarta Sans** para cuerpo. Cifras con `font-feature-settings: "tnum"`.
- Radio 0 en todo; 2–4 px solo en chips. Sin sombras, sin degradados, sin blur, sin emoji.
- Bordes de 1 px gris para separar y 2 px negro (o blanco sobre negro) para delimitar.
- Lima `#c0f541` en un solo elemento por página y nunca sobre blanco.
- Movimiento: fundidos y traslaciones cortas; barras a 700 ms; todo respeta `prefers-reduced-motion`.

Responsive por `clamp()` y `auto-fit/minmax`, sin breakpoints fijos salvo la navegación
(menú de hamburguesa por debajo de 1140 px).

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio. Se usa en canonical, hreflang, sitemap y Open Graph. |
| `LEAD_WEBHOOK_URL` | Destino del formulario de contacto (POST JSON). Vacío = solo log. |
| `LEAD_WEBHOOK_TOKEN` | Opcional. Se envía como `Authorization: Bearer …`. |

---

## Despliegue

Proyecto Next.js estándar: en Vercel basta con conectar el repositorio, definir las variables de
entorno y desplegar. Todas las rutas se prerenderizan en build; solo la acción del formulario corre
en servidor.

---

## Pendientes

- [ ] 14 imágenes de caso (2 por caso) y 3 fotos de sección. Las de "El método" y Contacto son provisionales.
- [ ] Traducción al inglés del cuerpo largo (casos, artículos, legales).
- [ ] Destino final del formulario (CRM o correo) vía `LEAD_WEBHOOK_URL`.
- [ ] Etiquetas de analítica y publicidad condicionadas a `f2s_consent`.
- [ ] Segundo eje de filtro en Insights (por resultado) cuando el volumen lo justifique.

---

<p align="center">
  <sub>Fix 2 Scale SAS · Bogotá, Colombia · <a href="mailto:info@fix2scale.com">info@fix2scale.com</a></sub>
</p>
