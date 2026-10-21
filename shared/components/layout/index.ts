// Primitivas de layout de la web (ADR-0007). Qué es cada una, cuándo usarla
// y ejemplos vivos: /dev/layout.
export { Section } from "./section";
export { Stack } from "./stack";
export { Cluster } from "./cluster";
export { Media } from "./media";
export { AutoGrid } from "./auto-grid";
export { Grid, Cell } from "./grid";

export type { SectionProps } from "./section";
export type { StackProps } from "./stack";
export type { ClusterProps } from "./cluster";
export type { MediaProps } from "./media";
export type { AutoGridProps } from "./auto-grid";
export type { GridProps, CellProps, Column, Row } from "./grid";
export type {
  Space,
  Breakpoint,
  Responsive,
  LayoutElement,
  LayoutProps,
} from "./types";
