import { buildMetadata } from "@/lib/seo";

import LayoutGuide from "./components/layout-guide";

// Referencia viva de las primitivas de layout (SPEC-0004). No se indexa:
// es para quien construye sobre la base, no para visitantes.
export const metadata = buildMetadata({
  title: "Primitivas de layout",
  description: "Qué es cada primitiva de layout, cuándo usarla y ejemplos vivos.",
  path: "/dev/layout",
  noIndex: true,
});

const Page = () => <LayoutGuide />;

export default Page;
