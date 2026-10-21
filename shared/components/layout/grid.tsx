import type { Breakpoint, LayoutProps, Responsive, Space } from "./types";

import clsx from "clsx";

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
export const Grid = ({
  as: Tag = "div",
  rowGap,
  className,
  ...rest
}: GridProps) => (
  <Tag
    className={clsx("o-grid", rowGap && `o-grid--row-gap-${rowGap}`, className)}
    {...rest}
  />
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
/** Columnas por breakpoint. Gemelo de $total-columns__* en styles/01-settings/settings.scss. */
const COLUMNS_AT: Record<Breakpoint, number> = { sm: 4, md: 6, lg: 12 };

/** Valor en un breakpoint. Un valor suelto aplica a todos; un objeto, solo a los que nombra. */
const pick = <T,>(
  value: Responsive<T> | undefined,
  bp: Breakpoint,
): T | undefined =>
  value === undefined
    ? undefined
    : typeof value === "object"
      ? (value as Partial<Record<Breakpoint, T>>)[bp]
      : value;

/**
 * Clases de columna por breakpoint. Si la celda no cabe en las columnas de
 * ese breakpoint (p. ej. `start={7}` en las 4 de sm), no se emite nada y
 * ocupa todo el ancho de contenido.
 */
const placement = (start: CellProps["start"], span: CellProps["span"]) =>
  BREAKPOINTS.flatMap((bp) => {
    const s = pick(start, bp);
    const n = pick(span, bp);

    if (s === undefined && n === undefined) return [];
    const from = s ?? 1;
    const to = n === undefined ? from : from + n - 1;

    if (to > COLUMNS_AT[bp]) return [];
    const classes = [`o-cell-start-${from}@${bp}`];

    if (n !== undefined) classes.push(`o-cell-end-${to}@${bp}`);

    return classes;
  });

/**
 * Una celda del `Grid`. Un número suelto (`span={8}`) vale para todos los
 * breakpoints; un objeto (`span={{ lg: 8 }}`) solo para los que nombra, y se
 * hereda hacia arriba como en `Col`. `start` y `span` se leen juntos: si
 * cambias uno en un breakpoint, pasa los dos. Una celda que no cabe en las
 * columnas del breakpoint ocupa todo el ancho de contenido. Ver /dev/layout.
 */
export const Cell = ({
  as: Tag = "div",
  start,
  span,
  row,
  breakout,
  align,
  className,
  ...rest
}: CellProps) => (
  <Tag
    className={clsx(
      "o-cell",
      placement(start, span),
      // Un `row` suelto basta emitirlo en sm: mobile-first, se hereda hacia arriba.
      BREAKPOINTS.map((bp) => {
        const r =
          typeof row === "object" ? row[bp] : bp === "sm" ? row : undefined;

        return r && `o-cell-row-${r}@${bp}`;
      }),
      breakout && `o-cell--${breakout}`,
      align && `o-cell--align-${align}`,
      className,
    )}
    {...rest}
  />
);
