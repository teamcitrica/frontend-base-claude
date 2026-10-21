import type { LayoutProps, Space } from "./types";

import clsx from "clsx";

export interface AutoGridProps extends LayoutProps {
  /** Ancho mínimo de cada elemento, en px. Caben tantas columnas como permita el ancho. */
  minItemWidth: 220 | 240;
  /** Espacio entre elementos, en pasos de la escala. */
  gap: Space;
}

/** Columnas que se reparten solas según el ancho disponible. Ver /dev/layout. */
export const AutoGrid = ({
  as: Tag = "div",
  minItemWidth,
  gap,
  className,
  ...rest
}: AutoGridProps) => (
  <Tag
    className={clsx(
      "o-autogrid",
      `o-autogrid--min-${minItemWidth}`,
      `o-autogrid--gap-${gap}`,
      className,
    )}
    {...rest}
  />
);
