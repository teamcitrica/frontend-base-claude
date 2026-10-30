import Image from "next/image";
import clsx from "clsx";

interface BrandLogoProps {
  /** `default`: azul con gorro coral, para la crema. `light`: crema, para el azul. */
  tone?: "default" | "light";
  /** `md`: 48px de alto (header). `lg`: 96px (pie). */
  size?: "md" | "lg";
  priority?: boolean;
}

const SRC = {
  default: "/img/logo-resto-app.svg",
  light: "/img/logo-resto-app-light.svg",
};

/** Logo real de Resto App (restoapp.club). La altura sale de `.c-logo`. */
export const BrandLogo = ({
  tone = "default",
  size = "md",
  priority = false,
}: BrandLogoProps) => (
  <Image
    alt="Resto App"
    className={clsx("c-logo", size === "lg" && "c-logo--lg")}
    height={351}
    priority={priority}
    src={SRC[tone]}
    width={513}
  />
);
