"use client";

import type { SidebarNavProps } from "../../types/sidebar";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "citrica-ui-toolkit";

/**
 * Envoltorio de cliente sobre el `Sidebar` de citrica-ui-toolkit.
 *
 * El componente del toolkit es agnóstico del router: no navega ni resuelve el
 * item activo por su cuenta. Este wrapper aporta las tres piezas que faltan:
 * navegación con `next/navigation`, marcado del item activo y filtrado por rol.
 */
function SidebarNavContent({ items, roleId }: SidebarNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const visibleItems = useMemo(() => {
    if (roleId === undefined || roleId === null) return items;

    return items.filter(
      (item) =>
        !item.allowedRoles?.length || item.allowedRoles.includes(roleId),
    );
  }, [items, roleId]);

  // Los subitems de `siteConfig` llevan query string (ej. `/admin/reservas?page=lista`)
  // y el toolkit compara el href completo, así que hay que reconstruirlo.
  const query = searchParams.toString();
  const activeSubHref = query ? `${pathname}?${query}` : pathname;

  return (
    <Sidebar
      activeHref={pathname}
      activeSubHref={activeSubHref}
      items={visibleItems}
      onItemClick={(href) => {
        if (href && href !== "#") router.push(href);
      }}
    />
  );
}

export default function SidebarNav(props: SidebarNavProps) {
  // `useSearchParams` obliga a un límite de Suspense para no forzar el
  // renderizado en cliente de toda la ruta que monte este sidebar.
  return (
    <Suspense fallback={null}>
      <SidebarNavContent {...props} />
    </Suspense>
  );
}
