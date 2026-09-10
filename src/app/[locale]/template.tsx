/** Fundido de 120–140ms entre páginas (handoff §6). El template se remonta en cada navegación. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
