"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNavbar } from "citrica-ui-toolkit";

import SidebarNav from "@/shared/components/organisms/sidebar-nav";
import { siteConfig } from "@/config/site";
import { UserAuth } from "@/shared/context/auth-context";
import { BrandLogo } from "@/shared/project-components/resto-app";
import "@/styles/globals.scss";

/**
 * Armazón del admin (SPEC-0008): `Sidebar` (vía `SidebarNav`) a la izquierda y,
 * a la derecha, `AdminNavbar` + contenido con scroll propio en escritorio. El ☰
 * del navbar abre el drawer del sidebar en celular y recupera el foco al
 * cerrarse. Sin campanita: todavía no hay fuente de avisos.
 */
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userSession, userInfo, loading, signOut } = UserAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Solo redirigir si no está cargando y no hay sesión
    if (!loading && userSession === null) {
      router.push("/login");
    }
  }, [userSession, loading, router]);

  // Mostrar loading mientras se verifica la sesión
  if (loading) {
    return null;
  }

  // Si no hay sesión después de cargar, no renderizar (se está redirigiendo)
  if (userSession === null || userInfo === null) {
    return null;
  }

  const fullName =
    `${userInfo?.first_name ?? ""} ${userInfo?.last_name ?? ""}`.trim();

  return (
    <div className="c-admin-shell">
      <SidebarNav
        className="c-sidebar"
        collapsedHeader={<BrandLogo priority size="sm" variant="mark" />}
        header={<BrandLogo priority />}
        items={siteConfig.sidebarItems}
        mobileOpen={menuOpen}
        mobileReturnFocusRef={menuButtonRef}
        roleId={userInfo?.role_id}
        onMobileOpenChange={setMenuOpen}
      />
      <div className="c-admin-shell__column">
        <AdminNavbar
          menuButtonRef={menuButtonRef}
          menuOpen={menuOpen}
          mobileLogo={<BrandLogo size="sm" variant="mark" />}
          user={{
            name: fullName || "Usuario",
            role: userInfo?.name || undefined,
            menu: [
              {
                key: "logout",
                label: "Cerrar sesión",
                icon: "LogOut",
                danger: true,
                // signOut() redirige a /logout, que cierra la sesión y lleva a
                // /login. Sin AuthContextProvider (base sin auth) no existe.
                onAction: () => signOut?.(),
              },
            ],
          }}
          onMenuClick={() => setMenuOpen(true)}
        />
        <main className="c-admin-shell__content">{children}</main>
      </div>
    </div>
  );
}
