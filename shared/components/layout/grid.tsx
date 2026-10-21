import clsx from "clsx";

import type { Breakpoint, LayoutProps, Responsive, Space } from "./types";

/** Columnas de la retícula: 4 en sm, 6 en md, 12 en lg (las mismas del Container). */
export type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/** Filas explícitas: dos celdas en la misma fila y columnas se superponen. */
export type Row = 1 | 2 | 3 | 4 | 5 | 6;

export interface GridProps extends LayoutProps {
  /** Espacio entre filas, en pasos de la escala. Entre columnas siempre va el gutter del sistema. */
  rowGap?: Space;
}

/**
 * Retícula de 12/6/4 columnas alineada con Container/Col, con superposición
 * de celdas y salida a sangre. Sus hijos directos son `Cell`. Ver /dev/layout.
 */
export const Grid = ({ as: Tag = "div", rowGap, className, ...rest }: GridProps) => (
  <Tag className={clsx("o-grid", rowGap && `o-grid--row-gap-${rowGap}`, className)} {...rest} />
);

export interface CellProps extends LayoutProps {
  /** Columna donde empieza (1 = primera). Por defecto, 1. */
  start?: Responsive<Column>;
  /** Cuántas columnas ocupa. Sin `start` ni `span`, ocupa todo el ancho de contenido. */
  span?: Responsive<Column>;
  /** Fila explícita. Dos celdas con la misma fila y columnas que se cruzan se superponen. */
  row?: Responsive<Row>;
  /**
   * Salida de la retícula: `full` de borde a borde de la pantalla; `wide-start`
   * estira hasta el borde izquierdo; `wide-end`, hasta el derecho.
   */
  breakout?: "full" | "wide-start" | "wide-end";
  /** Alineación vertical dentro de su fila. */
  align?: "start" | "center" | "end";
}

const BREAKPOINTS: Breakpoint[] = ["sm", "md", "lg"];

const pick = <T,>(value: Responsive<T> | undefined, bp: Breakpoint): T | undefined =>
  value === undefined ? undefined : typeof value === "object" ? (value as Partial<Record<Breakpoint, T>>)[bp] : bp === "sm" ? value : undefined;

const placement = (start: CellProps["start"], span: CellProps["span"]) =>
  BREAKPOINTS.flatMap((bp) => {
    const s = pick(start, bp);
    const n = pick(span, bp);
    if (s === undefined && n === undefined) return [];
    const from = s ?? 1;
    const classes = [`o-cell-start-${from}@${bp}`];
    if (n !== undefined) classes.push(`o-cell-end-${from + n - 1}@${bp}`);
    return classes;
  });

/**
 * Una celda del `Grid`. `start` y `span` se leen juntos en cada breakpoint y
 * se heredan hacia arriba, como en `Col`: si cambias uno en un breakpoint,
 * pasa los dos. Una celda que no cabe en las columnas del breakpoint llega
 * hasta el final del contenido. Ver /dev/layout.
 */
export const Cell = ({ as: Tag = "div", start, span, row, breakout, align, className, ...rest }: CellProps) => (
  <Tag
    className={clsx(
      "o-cell",
      placement(start, span),
      BREAKPOINTS.map((bp) => {
        const r = pick(row, bp);
        return r && `o-cell-row-${r}@${bp}`;
      }),
      breakout && `o-cell--${breakout}`,
      align && `o-cell--align-${align}`,
      className,
    )}
    {...rest}
  />
);
