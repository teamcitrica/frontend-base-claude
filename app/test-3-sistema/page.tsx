import Canales from "./components/canales";
import Cierre from "./components/cierre";
import Cuenta from "./components/cuenta";
import Finanzas from "./components/finanzas";
import Flujo from "./components/flujo";
import Hero from "./components/hero";
import Operacion from "./components/operacion";
import Preguntas from "./components/preguntas";
import Roles from "./components/roles";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

import { buildMetadata } from "@/lib/seo";
import { LandingShell } from "@/shared/project-components/resto-app";

// ============================================================
// Landing de Resto App construida solo con el sistema — SPEC-0007.
// Sin SCSS de página: todo gesto sale de los componentes de
// shared/project-components/resto-app/ (estilos en
// styles/08-components/_resto-app.scss). Página de servidor solo
// para `metadata`; las secciones son cliente porque importan el
// toolkit.
// ============================================================

export const metadata = buildMetadata({
  title: "Todo tu restaurante en un solo sistema",
  description:
    "Salón, mostrador, delivery propio y menú web en un solo flujo. Monto fijo mensual, sin comisiones por venta. Pide tu demo por WhatsApp.",
  path: "/test-3-sistema",
});

const RestoAppSistemaPage = () => (
  <LandingShell>
    <SiteHeader />
    <main>
      <Hero />
      <Canales />
      <Flujo />
      <Operacion />
      <Finanzas />
      <Roles />
      <Cuenta />
      <Preguntas />
      <Cierre />
    </main>
    <SiteFooter />
  </LandingShell>
);

export default RestoAppSistemaPage;
