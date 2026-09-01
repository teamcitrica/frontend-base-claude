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
}
