import Image from "next/image";
import clsx from "clsx";

interface BrandLogoProps {
  /** `default`: azul con gorro coral, para la crema. `light`: crema, para el azul. */
  tone?: "default" | "light";
  /** `full`: logo completo. `mark`: solo el gorro, para huecos cuadrados (sidebar colapsado, celular). */
  variant?: "full" | "mark";
  /** `sm`: 32px de alto. `md`: 48px (header). `lg`: 96px (pie). */
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const SRC = {
  default: "/img/logo-resto-app.svg",
  light: "/img/logo-resto-app-light.svg",
};

/** Logo real de Resto App (restoapp.club). La altura sale de `.c-logo`. */
export const BrandLogo = ({
  tone = "default",
  variant = "full",
  size = "md",
  priority = false,
}: BrandLogoProps) => {
  // El gorro es coral sobre cualquier fondo: no tiene versión light.
  const isMark = variant === "mark";

  return (
    <Image
      alt="Resto App"
      className={clsx("c-logo", size !== "md" && `c-logo--${size}`)}
      height={isMark ? 145 : 351}
      priority={priority}
      src={isMark ? "/img/restoapp-logo-collapsed.svg" : SRC[tone]}
      width={isMark ? 178 : 513}
    />
  );
};
