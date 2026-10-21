import clsx from "clsx";

import type { LayoutProps, Space } from "./types";

export interface ClusterProps extends LayoutProps {
  /** Espacio entre hijos; con `{ row, column }`, distinto entre filas y entre columnas. */
  gap: Space | { row: Space; column: Space };
  /** Alineación vertical de los hijos. Sin valor, se estiran a la altura de la fila. */
  align?: "start" | "center";
  /** `between` empuja el primer y el último hijo a los extremos. */
  justify?: "start" | "between";
  /** `false` mantiene todo en una línea (p. ej. icono + texto). */
  wrap?: boolean;
}

/** Fila que se envuelve cuando no cabe. Ver /dev/layout. */
export const Cluster = ({ as: Tag = "div", gap, align, justify = "start", wrap = true, className, ...rest }: ClusterProps) => (
  <Tag
    className={clsx(
      "o-cluster",
      typeof gap === "number" ? `o-cluster--gap-${gap}` : [`o-cluster--row-gap-${gap.row}`, `o-cluster--col-gap-${gap.column}`],
      align && `o-cluster--align-${align}`,
      justify === "between" && "o-cluster--justify-between",
      !wrap && "o-cluster--nowrap",
      className,
    )}
    {...rest}
  />
);
