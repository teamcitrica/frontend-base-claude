import clsx from "clsx";

import type { LayoutProps, Space } from "./types";

export interface StackProps extends LayoutProps {
  /** Espacio entre hijos, en pasos de la escala (`6` = 24px). */
  gap: Space;
}

/** Pila vertical con un espacio constante entre hijos. Ver /dev/layout. */
export const Stack = ({ as: Tag = "div", gap, className, ...rest }: StackProps) => (
  <Tag className={clsx("o-stack", `o-stack--gap-${gap}`, className)} {...rest} />
);
