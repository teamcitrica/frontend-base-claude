import CtaFinal from "./components/cta-final";
import Flujo from "./components/flujo";
import Hero from "./components/hero";
import Precio from "./components/precio";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

import { buildMetadata } from "@/lib/seo";

// ============================================================
// Landing de Resto App — SPEC-0005 ("La cuenta de la comisión")
//
// Página de servidor solo para `metadata`; las secciones son cliente
// porque importan el toolkit. Precio, comisión y WhatsApp son DE MUESTRA
// y viven en components/cuenta.ts.
// ============================================================

export const metadata = buildMetadata({
  // La plantilla `%s | Resto App` de config/site.ts pone la marca.
  title: "Haz la cuenta de tus comisiones",
  description:
    "Sistema todo-en-uno para restaurantes, dark kitchens, bares y cafeterías en Venezuela. Costo fijo mensual, sin comisión por venta.",
  path: "/test-1-sin-brief",
});

const RestoAppPage = () => (
  <div className="test-1-sin-brief">
    <SiteHeader />
    <main>
      <Hero />
      <Flujo />
      <Precio />
      <CtaFinal />
    </main>
    <SiteFooter />
  </div>
);

export default RestoAppPage;
