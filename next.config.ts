import type { NextConfig } from "next";

// Rutas sin prefijo = español (idioma por defecto). `/en/...` = inglés.
// Internamente todo vive en `app/[locale]/...`.
const NOT_EN_OR_ASSET =
  "/:path((?!en(?:/|$)|es(?:/|$)|_next|api|fonts|images|logo|favicon|icon|robots\\.txt|sitemap\\.xml|manifest).*)";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/es" },
        { source: NOT_EN_OR_ASSET, destination: "/es/:path" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Alias históricos del prototipo → 301 a la ruta nueva.
      {
        source: "/caso-universidad",
        destination: "/insights/universidad-recupera-control-motor-comercial",
        statusCode: 301,
      },
      { source: "/resultados", destination: "/insights", statusCode: 301 },
      {
        source: "/en/caso-universidad",
        destination: "/en/insights/universidad-recupera-control-motor-comercial",
        statusCode: 301,
      },
      { source: "/en/resultados", destination: "/en/insights", statusCode: 301 },
      // El español no lleva prefijo: evitamos URLs duplicadas.
      { source: "/es", destination: "/", statusCode: 301 },
      { source: "/es/:path*", destination: "/:path*", statusCode: 301 },
    ];
  },
};

export default nextConfig;
