import CtaFinal from "./components/cta-final";
import Hero from "./components/hero";
import Incluye from "./components/incluye";
import Precio from "./components/precio";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

import { buildMetadata } from "@/lib/seo";

// ============================================================
// Landing de Resto App en vidrio — SPEC-0006 (comp Glassmorphism,
// colores y fuentes de la marca). Página de servidor solo para
// `metadata`; las secciones son cliente porque importan el toolkit.
// Precio y WhatsApp son DE MUESTRA y viven en
// app/test-1-sin-brief/components/cuenta.ts (un solo lugar).
// ============================================================

export const metadata = buildMetadata({
  title: "Todo tu local, un solo cierre",
  description:
    "Sistema todo-en-uno para restaurantes en Venezuela. Costo fijo mensual, sin comisión por venta. Pide tu demo por WhatsApp.",
  path: "/test-2-corto",
});

const RestoAppVidrioPage = () => (
  <div className="test-2-corto">
    <SiteHeader />
    <main>
      <Hero />
      <Incluye />
      <Precio />
      <CtaFinal />
    </main>
    <SiteFooter />
  </div>
);

export default RestoAppVidrioPage;
