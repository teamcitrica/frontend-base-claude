import type { HTMLAttributes, ReactNode } from "react";

/**
 * Pasos de la escala de espaciado: `gap={6}` = `var(--space-6)` = 24px.
 * Gemelo de `$space-steps` en styles/10-tokens/web/foundations/_space.scss:
 * si añades un paso allí, añádelo aquí.
 */
export type Space = 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 24 | 32;

export type Breakpoint = "sm" | "md" | "lg";

/** Un valor para todos los breakpoints, o uno por breakpoint (mobile-first, como `Col`). */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

/** Elementos en los que puede renderizarse una primitiva. */
export type LayoutElement =
  | "div"
  | "section"
  | "footer"
  | "header"
  | "article"
  | "aside"
  | "nav"
  | "ul"
  | "ol"
  | "li"
  | "span";

/**
 * Props comunes. Sin `style`: el layout sale de clases y tokens, nunca de
 * estilos inline (ADR-0007).
 */
export interface LayoutProps
  extends Omit<HTMLAttributes<HTMLElement>, "style" | "className" | "children"> {
  as?: LayoutElement;
  className?: string;
  children?: ReactNode;
}
