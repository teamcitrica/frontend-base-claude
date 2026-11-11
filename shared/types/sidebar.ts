import type { ReactNode, RefObject } from "react";

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  icon: string;
  href?: string;
  subItems?: SubMenuItem[];
  allowedRoles?: number[]; // Control de permisos por rol
}

export interface SidebarNavProps {
  items: MenuItem[];
  /**
   * Rol del usuario actual. Si se omite, no se filtra por `allowedRoles`
   * (comportamiento de los layouts sin auth conectada).
   */
  roleId?: number | null;
  /** Logo en la cabecera del sidebar abierto. */
  header?: ReactNode;
  /** Logo compacto con el sidebar colapsado. */
  collapsedHeader?: ReactNode;
  /**
   * Drawer móvil controlado desde afuera (el ☰ del `AdminNavbar`). Si se pasa,
   * el `Sidebar` del toolkit no dibuja su botón flotante.
   */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /** Elemento que recupera el foco al cerrar el drawer (el ☰). */
  mobileReturnFocusRef?: RefObject<HTMLElement | null>;
  /** Clase en el panel de escritorio y en el drawer. */
  className?: string;
}
