import type { LayoutProps } from "./types";

import clsx from "clsx";

export interface SectionProps extends LayoutProps {
  /** Aire vertical: `tight` 40px · `default` 64px · `airy` 96px · `none` 0. */
  rhythm?: "none" | "tight" | "default" | "airy";
  /** Fondo: `base` sin fondo · `surface` neutro claro · `inverse` carbón. */
  tone?: "base" | "surface" | "inverse";
}

const RHYTHM = {
  none: "o-section--flush",
  tight: "o-section--tight",
  default: undefined,
  airy: "o-section--airy",
};
const TONE = {
  base: undefined,
  surface: "o-section--surface",
  inverse: "o-section--inverse",
};

/** Banda de página con su ritmo vertical y su fondo. Ver /dev/layout. */
export const Section = ({
  as: Tag = "section",
  rhythm = "default",
  tone = "base",
  className,
  ...rest
}: SectionProps) => (
  <Tag
    className={clsx("o-section", RHYTHM[rhythm], TONE[tone], className)}
    {...rest}
  />
);
