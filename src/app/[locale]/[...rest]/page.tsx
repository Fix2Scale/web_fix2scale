import { notFound } from "next/navigation";

/** Cualquier ruta no declarada bajo el idioma → 404. */
export default function CatchAll() {
  notFound();
}
