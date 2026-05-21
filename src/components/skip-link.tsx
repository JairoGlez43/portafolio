/**
 * Skip-to-content link: only visible on keyboard focus.
 * Helps screen reader and keyboard users bypass the header.
 */
export function SkipLink() {
  return (
    <a
      href="#contenido-principal"
      className="absolute left-3 top-3 z-[100] -translate-y-20 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform focus:translate-y-0"
    >
      Saltar al contenido
    </a>
  );
}
