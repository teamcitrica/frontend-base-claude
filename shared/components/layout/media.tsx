import clsx from "clsx";

import type { LayoutProps } from "./types";

export interface MediaProps extends LayoutProps {
  /** Proporción ancho / alto del marco. */
  ratio: "16/10" | "4/3";
  /** Esquinas: `md` 12px (--radius-md) · `none` rectas. */
  radius?: "md" | "none";
}

const RATIO = { "16/10": "o-media--16x10", "4/3": "o-media--4x3" };

/**
 * Marco con proporción fija; la imagen de dentro lo cubre. Pensado para
 * `next/image` con `fill`. Ver /dev/layout.
 */
export const Media = ({ as: Tag = "div", ratio, radius = "md", className, ...rest }: MediaProps) => (
  <Tag className={clsx("o-media", RATIO[ratio], radius === "none" && "o-media--radius-none", className)} {...rest} />
);
