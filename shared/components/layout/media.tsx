import type { LayoutProps } from "./types";

import clsx from "clsx";

export interface MediaProps extends LayoutProps {
  /** Proporción ancho / alto del marco. `3/4` es retrato (moda, personas). */
  ratio: "16/10" | "4/3" | "3/4";
  /** Esquinas: `md` 12px (--radius-md) · `none` rectas. */
  radius?: "md" | "none";
}

const RATIO = {
  "16/10": "o-media--16x10",
  "4/3": "o-media--4x3",
  "3/4": "o-media--3x4",
};

/**
 * Marco con proporción fija; la imagen de dentro lo cubre. Pensado para
 * `next/image` con `fill`. Ver /dev/layout.
 */
export const Media = ({
  as: Tag = "div",
  ratio,
  radius = "md",
  className,
  ...rest
}: MediaProps) => (
  <Tag
    className={clsx(
      "o-media",
      RATIO[ratio],
      radius === "none" && "o-media--radius-none",
      className,
    )}
    {...rest}
  />
);
