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

export interface SidebarProps {
  items: MenuItem[];
  session?: any;
}
