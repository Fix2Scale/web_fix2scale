import type { Articulo } from "@/lib/content";

const S = "leads-pero-no-ventas";

export const art02: Articulo = {
  type: "articulo",
  id: S,
  topic: "Funnel comercial",
  min: 12,
  title:
    "Marketing genera leads, pero las ventas no crecen: cómo encontrar dónde se está rompiendo el funnel comercial",
  cardTitle: "Marketing genera leads, pero las ventas no crecen",
  excerpt:
    "Más leads no siempre significan más ventas. Aprende a leer el funnel completo para saber si el problema está en adquisición, calidad, seguimiento, oportunidad o cierre.",
  published: "26 de agosto de 2026",
  updated: "26 de agosto de 2026",
  thumb: "/images/insights/art02-miniatura.png",
  banner: "/images/insights/art02-banner.png",
  bannerBg: "#0a1420",
  alt: "Diagrama Fix 2 Scale del funnel comercial: demanda, leads, calificados, oportunidades y ventas con las fugas señaladas",
  seo: {
    title: "Marketing genera leads, pero las ventas no crecen",
    description:
      "Cómo leer el funnel completo para encontrar dónde se rompe: calidad de la demanda, conversión, calificación, seguimiento comercial o cierre. Con matriz de diagnóstico.",
  },
  blocks: [
    {
      type: "p",
      html: "Pocas conversaciones desgastan tanto la relación entre marketing y ventas como esta: marketing cumple la meta de leads, ventas responde que esos leads no sirven, marketing contesta que no se están gestionando y la dirección pregunta dónde está el problema.",
    },
    {
      type: "callout",
      label: "La respuesta corta",
      html: "Si marketing genera leads pero las ventas no crecen, el problema puede estar en cinco lugares: la calidad de la demanda, la conversión del canal, la calificación, el seguimiento comercial o el cierre. La forma correcta de encontrarlo no es discutir si \"los leads son malos\", sino medir la conversión y el tiempo entre cada etapa, segmentados por fuente, oferta y tipo de cliente.",
    },
    {
      type: "p",
      html: "La discusión suele plantearse como un conflicto entre áreas cuando, en realidad, debería ser un problema de diagnóstico. Un lead no genera crecimiento por existir. Tiene que avanzar por una secuencia de decisiones y acciones hasta convertirse en una oportunidad y, finalmente, en revenue.",
    },
    {
      type: "p",
      html: "Si observamos únicamente el costo por lead o el número de formularios, todo lo que ocurre después queda oculto. Y si observamos únicamente los cierres, perdemos la capacidad de identificar en qué punto empezó a deteriorarse el resultado.",
    },
    { type: "h2", id: `${S}-s1`, text: "El funnel no es un gráfico: es una cadena de conversiones" },
    {
      type: "p",
      html: "En un negocio B2B o de venta consultiva, una representación sencilla puede ser: demanda → lead → lead calificado → oportunidad → propuesta → cierre → revenue.",
    },
    {
      type: "p",
      html: "Los nombres pueden cambiar según la empresa. Lo importante es que cada etapa represente un cambio real en la intención, el fit o el avance comercial, y que exista un criterio verificable para entrar y salir de ella.",
    },
    {
      type: "p",
      html: "El diagnóstico consiste en comparar cuánto entra, cuánto avanza, cuánto tarda y cuánto valor produce cada etapa. Ahí aparecen patrones que una cifra agregada de leads nunca mostraría.",
    },
    { type: "h2", id: `${S}-s2`, text: "1. Hay muchos leads, pero pocos pertenecen al cliente que realmente compra" },
    {
      type: "p",
      html: "El primer escenario es un problema de calidad o intención. La campaña puede estar funcionando técnicamente: anuncios relevantes, buen costo por lead y formularios suficientes. Sin embargo, las personas que convierten no tienen el perfil, necesidad, presupuesto, autoridad o momento de compra que requiere la oferta.",
    },
    {
      type: "p",
      html: "Esto ocurre con frecuencia cuando el algoritmo está optimizado para conseguir la conversión más barata y la empresa le entrega como señal un formulario, no una venta. La plataforma aprende a encontrar personas propensas a completar ese formulario. Eso no significa que haya aprendido a encontrar buenos clientes.",
    },
    {
      type: "p",
      html: "La pregunta no debería ser solamente cuánto cuesta un lead. También: ¿qué porcentaje se convierte en oportunidad y cuánto revenue produce cada fuente?",
    },
    { type: "h2", id: `${S}-s3`, text: "2. El lead es adecuado, pero la promesa de marketing y la conversación comercial no coinciden" },
    {
      type: "p",
      html: "Una campaña puede atraer al segmento correcto y aun así generar fricción si el mensaje que produjo la conversión no coincide con lo que ocurre después.",
    },
    {
      type: "p",
      html: "Por ejemplo, marketing comunica una solución sencilla y ventas inicia una conversación compleja; la campaña enfatiza un beneficio y el vendedor presenta otro; el anuncio ofrece una evaluación y el prospecto recibe inmediatamente una cotización. El problema no es necesariamente el lead: es la continuidad de la experiencia.",
    },
    {
      type: "p",
      html: "Una auditoría útil compara anuncios, landing pages, formularios, correos, guiones, materiales comerciales y propuestas. El cliente debería sentir que avanza por una misma conversación, no que cambia de empresa al pasar de marketing a ventas.",
    },
    { type: "h2", id: `${S}-s4`, text: "3. Los leads llegan, pero nadie sabe con qué velocidad ni profundidad se gestionan" },
    { type: "p", html: "Entre el formulario y la primera conversación existe una etapa que muchas organizaciones miden mal: el seguimiento." },
    {
      type: "p",
      html: "No basta con saber que un vendedor fue asignado. Hay que poder responder cuánto tardó el primer contacto, cuántos intentos se realizaron, por qué canal, qué resultado tuvo cada intento y cuándo se decidió que el lead no continuaría.",
    },
    {
      type: "p",
      html: "Si esos datos viven en WhatsApp, correo, notas personales o simplemente no existen, marketing y ventas terminan discutiendo con percepciones. El CRM debería permitir reconstruir lo ocurrido sin depender de la memoria de nadie.",
    },
    {
      type: "figure",
      slot: "f2s-art02-inline",
      alt: "Pantalla de CRM con las etapas del funnel siendo revisadas por el equipo comercial",
      caption: "El seguimiento es la etapa peor medida del funnel: tiempo al primer contacto, intentos, canal y resultado de cada intento.",
    },
    { type: "h2", id: `${S}-s5`, text: "4. La definición de \"lead calificado\" no está compartida" },
    { type: "p", html: "Una de las fugas más frecuentes ocurre porque marketing y ventas utilizan la misma palabra para describir cosas distintas." },
    {
      type: "p",
      html: "Para marketing, un lead calificado puede ser alguien del segmento correcto que mostró determinada intención. Para ventas, puede ser alguien con necesidad confirmada, presupuesto y una decisión cercana. Ambas definiciones pueden ser razonables, pero si no existe un acuerdo explícito, la tasa de aceptación siempre será objeto de discusión.",
    },
    {
      type: "p",
      html: "El criterio debe construirse a partir de evidencia: ¿qué características comparten las oportunidades que realmente avanzan y los clientes que generan valor? Ese aprendizaje debería regresar a segmentación, contenidos, campañas y formularios.",
    },
    { type: "h2", id: `${S}-s6`, text: "5. Las oportunidades existen, pero se pierden antes del cierre" },
    {
      type: "p",
      html: "Cuando el lead se convierte en una oportunidad real y aun así las ventas no crecen, seguir optimizando campañas puede distraer del problema.",
    },
    {
      type: "p",
      html: "La fuga puede estar en discovery, demostración, propuesta, pricing, manejo de objeciones, diferenciación, velocidad, participación de decisores o seguimiento. También puede existir un portafolio demasiado complejo o una oferta que obliga al vendedor a construir cada negocio desde cero.",
    },
    {
      type: "p",
      html: "En este punto, el indicador clave deja de ser el costo por lead. Importan la tasa de oportunidad a cierre, duración del ciclo, motivos de pérdida, valor promedio, descuentos y desempeño por vendedor, segmento y oferta.",
    },
    { type: "h2", id: `${S}-s7`, text: "6. Sí hay ventas, pero nadie puede conectarlas con el origen" },
    { type: "p", html: "Existe otro escenario engañoso: el funnel funciona mejor de lo que parece, pero la medición está fragmentada." },
    {
      type: "p",
      html: "El lead entra desde una campaña, luego habla por WhatsApp, cambia de correo, el vendedor crea otra oportunidad en el CRM y el negocio se cierra semanas después. Marketing ve una conversión. Ventas ve un negocio. Dirección ve revenue. Nadie puede demostrar que pertenecen a la misma historia.",
    },
    {
      type: "p",
      html: "Sin una arquitectura mínima de datos, la empresa puede apagar canales rentables, aumentar inversión en fuentes que producen volumen pero no revenue o evaluar a los equipos con métricas incompatibles.",
    },
    { type: "h2", id: `${S}-s8`, text: "El diagnóstico: deja de mirar promedios y sigue cohortes" },
    {
      type: "p",
      html: "Una forma práctica de empezar es tomar los leads de un periodo suficientemente maduro para que hayan tenido tiempo de avanzar y reconstruir su recorrido.",
    },
    {
      type: "ul",
      items: [
        "¿De qué fuente, campaña y oferta provino cada lead?",
        "¿Qué segmento, empresa o perfil representaba?",
        "¿Cuánto tardó el primer contacto?",
        "¿Fue contactado y cuántos intentos recibió?",
        "¿Cumplió los criterios de calificación?",
        "¿Se convirtió en oportunidad?",
        "¿Recibió propuesta?",
        "¿Cerró o se perdió? ¿Cuál fue el motivo de pérdida?",
        "¿Cuánto revenue y margen produjo?",
      ],
    },
    {
      type: "p",
      html: "Después se comparan cohortes por fuente, campaña, segmento, vendedor, producto u oferta. El objetivo no es construir el dashboard más sofisticado. Es descubrir dónde cambia de manera significativa la probabilidad de avanzar.",
    },
    { type: "h2", id: `${S}-s9`, text: "Una matriz sencilla para localizar la fuga" },
    {
      type: "table",
      head: ["Lo que observas", "Posible restricción", "Qué revisar primero"],
      rows: [
        ["Pocos leads y buena conversión posterior", "Generación de demanda", "Alcance, canales, share of search, segmentación, inversión"],
        ["Muchos leads y pocos calificados", "Calidad / intención", "Targeting, mensaje, oferta, formulario, fuentes"],
        ["Buenos leads y poco contacto", "Gestión comercial", "SLA, tiempos, asignación, cadencia, capacidad"],
        ["Calificados pero pocas oportunidades", "Discovery / propuesta de valor", "Necesidad, fit, conversación, oferta, criterios"],
        ["Oportunidades pero pocos cierres", "Proceso de venta / oferta", "Win rate, pricing, objeciones, decisores, motivos de pérdida"],
        ["Ventas sin atribución confiable", "Datos / arquitectura", "CRM, IDs, UTMs, integración, etapas, offline conversions"],
      ],
    },
    {
      type: "p",
      html: "Si la matriz apunta a varias filas a la vez, es probable que la restricción no esté dentro del funnel sino en el sistema que lo rodea: propuesta de valor, portafolio o retención. Ese caso lo desarrollamos en <a class=\"link-inline\" href=\"/insights/por-que-mi-empresa-no-crece\">las siete causas de estancamiento comercial</a>.",
    },
    { type: "h2", id: `${S}-s10`, text: "Qué métricas deberían compartir marketing y ventas" },
    {
      type: "p",
      html: "No todas las empresas necesitan las mismas métricas, pero sí necesitan un lenguaje común. Para un funnel de generación de demanda, una base razonable incluye:",
    },
    {
      type: "ul",
      items: [
        "Leads por fuente y segmento.",
        "Porcentaje de leads contactados y tiempo hasta primer contacto.",
        "Lead → lead calificado y lead calificado → oportunidad.",
        "Oportunidad → propuesta y propuesta → cierre.",
        "Win rate y duración del ciclo comercial.",
        "Costo por oportunidad y costo de adquisición, cuando sea posible.",
        "Revenue y margen por fuente, segmento y oferta.",
      ],
    },
    {
      type: "p",
      html: "La utilidad aparece cuando estas métricas se leen juntas. Un canal con CPL alto puede ser excelente si produce oportunidades y cierres de mayor valor. Un canal con CPL bajo puede ser caro si consume horas del equipo y casi nunca llega a revenue.",
    },
    { type: "h2", id: `${S}-s11`, text: "No conviertas el funnel en una guerra de atribución" },
    {
      type: "p",
      html: "El propósito de medir no debería ser decidir qué área se lleva el crédito. Debería ser mejorar la capacidad de la empresa para asignar recursos y aprender.",
    },
    {
      type: "p",
      html: "Marketing necesita saber qué ocurre después del lead para mejorar adquisición. Ventas necesita entender qué originó y motivó la oportunidad para mejorar la conversación. Dirección necesita conectar ambas cosas con revenue, margen y velocidad de crecimiento.",
    },
    {
      type: "p",
      html: "Cuando la información circula en ambas direcciones, el funnel deja de ser una secuencia de handoffs y se convierte en un sistema de aprendizaje.",
    },
    { type: "h2", id: `${S}-s12`, text: "¿Cuándo sí necesitas más leads?" },
    { type: "p", html: "Después de todo este diagnóstico, puede ocurrir que la respuesta sea exactamente esa: necesitamos más demanda." },
    {
      type: "p",
      html: "Si el perfil de los leads es adecuado, los tiempos de gestión son saludables, las tasas de conversión son consistentes, el win rate es razonable y la capacidad comercial no está saturada, entonces aumentar el volumen puede ser la palanca correcta.",
    },
    {
      type: "p",
      html: "La diferencia es que ya no se trata de una intuición. La empresa sabe que el sistema puede absorber y convertir más demanda. Escalar deja de ser apostar y se convierte en una decisión informada.",
    },
    { type: "h2", id: `${S}-s13`, text: "El objetivo no es generar leads. Es construir un sistema que aprenda a generar revenue." },
    {
      type: "p",
      html: "Una empresa madura no debería depender de que marketing entregue una cifra y ventas dé una explicación. Debería poder seguir el recorrido desde la demanda hasta el ingreso, detectar dónde cambia el desempeño y convertir ese aprendizaje en ajustes de targeting, oferta, proceso y operación.",
    },
    {
      type: "p",
      html: "En Fix 2 Scale trabajamos precisamente en esa intersección. Diagnosticamos dónde se está perdiendo crecimiento, diseñamos la solución junto al equipo y ayudamos a implementarla. Después documentamos y transferimos el conocimiento para que la capacidad quede dentro de la empresa.",
    },
    { type: "h2", id: `${S}-s14`, text: "Preguntas frecuentes" },
    { type: "h3", text: "¿Por qué tengo leads pero no ventas?" },
    {
      type: "p",
      html: "Porque el volumen de leads es solo una etapa del proceso. Los leads pueden tener poco fit o intención, recibir seguimiento insuficiente, no convertirse en oportunidades o perderse durante la propuesta y el cierre. El diagnóstico requiere medir cada transición.",
    },
    { type: "h3", text: "¿Cómo saber si mis leads son de mala calidad?" },
    {
      type: "p",
      html: "Compara la tasa de calificación, oportunidad y cierre por fuente, campaña, segmento y oferta. Si una fuente produce muchos formularios pero sistemáticamente menos oportunidades o revenue, el problema puede estar en calidad o intención, no en volumen.",
    },
    { type: "h3", text: "¿Qué es más importante: costo por lead o costo por adquisición?" },
    {
      type: "p",
      html: "Depende del ciclo y de la capacidad de medición, pero para decisiones de negocio el costo por adquisición y el valor generado son más cercanos al resultado final. El CPL sigue siendo útil como indicador operativo, siempre que no se interprete aislado.",
    },
    { type: "h3", text: "¿Marketing o ventas es responsable de la conversión?" },
    {
      type: "p",
      html: "La responsabilidad cambia según la etapa, pero el resultado es compartido. Marketing influye en audiencia, intención, mensaje y contexto; ventas en calificación, conversación, propuesta y cierre. La empresa necesita criterios y datos que conecten ambas funciones.",
    },
    {
      type: "cta",
      label: "Siguiente paso",
      text: "¿Marketing está produciendo actividad, pero no puedes explicar con precisión por qué eso no se convierte en crecimiento? Reconstruimos el funnel de punta a punta y encontramos las fugas.",
    },
  ],
};
