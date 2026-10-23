import { Anton, Inter, Lato } from "next/font/google";

// Fuentes de Google servidas por next/font (self-hosted en el build).
// Un `@import url()` remoto en SCSS no sirve: Turbopack lo descarta del CSS
// compilado y el navegador cae al fallback sin avisar. Cada fuente expone una
// variable CSS que los slots $font-family-a/b/c/d de
// styles/01-settings/settings.scss consumen.
// Marca nueva = cambiar las familias aquí y los slots allá.

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand-display",
  display: "swap",
});

const text = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-brand-text",
  display: "swap",
});

const admin = Inter({
  subsets: ["latin"],
  variable: "--font-brand-admin",
  display: "swap",
});

/** Clases que declaran las variables de fuente; van en `<html>`. */
export const fontVariables = [
  display.variable,
  text.variable,
  admin.variable,
].join(" ");
