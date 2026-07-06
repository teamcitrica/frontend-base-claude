// Fuente serif didone para la marca "La Magenta Bakery".
// Alto contraste de trazo, estilo editorial (titulares "3 PACKS" / "Nuevos Packs").
// Se expone como variable CSS `--font-la-serif` y se aplica solo dentro del
// wrapper `.la-magenta` de la landing, sin afectar al resto de la app.
import { Playfair_Display } from "next/font/google";

export const laMagentaSerif = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-la-serif",
});
