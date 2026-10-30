import type { ReactNode } from "react";

/**
 * Envoltorio de una landing de Resto App: una sola tinta, selección de marca y
 * foco visible también en los enlaces del `Header` del toolkit (`.c-landing`).
 */
export const LandingShell = ({ children }: { children: ReactNode }) => (
  <div className="c-landing">{children}</div>
);
