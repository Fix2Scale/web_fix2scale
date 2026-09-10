/**
 * Imagen con caída a placeholder cuando la pieza aún no se ha entregado (handoff §9).
 * En cuanto exista `src`, es un <img> normal. El contenedor debe ser position:relative.
 */
export function ImgSlot({
  src,
  alt,
  spec,
  priority,
  style,
}: {
  src?: string;
  alt: string;
  spec: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className="img-cover"
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }
  return (
    <div className="img-slot" role="img" aria-label={alt}>
      <span>{spec}</span>
    </div>
  );
}
