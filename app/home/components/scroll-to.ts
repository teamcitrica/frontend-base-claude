/**
 * Lleva a una sección de la landing por su id, respetando `prefers-reduced-motion`.
 * Todo CTA primario de la página pasa por aquí y apunta a `agenda` (SPEC-0001, AC-2).
 */
export const scrollToSection = (id: string) => {
  const target = document.getElementById(id);

  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
};
