"use client"
import React from "react"
import { Suspense, useState } from 'react';
import { Button, Icon, IconName, Text } from "citrica-ui-toolkit"
import type { SidebarProps, MenuItem } from "../../../types/sidebar"
import { usePathname, useRouter } from 'next/navigation';
// TODO: Descomentar cuando se configure Supabase
// import { UserAuth } from "@/shared/context/auth-context";
// import { useSupabase } from "@/shared/context/supabase-context";

function AccordionItem({ item, isOpen, onToggle }: { item: MenuItem; isOpen: boolean; onToggle: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <Button
        isAdmin={true}
        variant="flat"
        className={`w-full justify-between px-4 py-2 transition-colors hover:bg-[#EEF1F7] hover:text-[#265197]`}
        onClick={onToggle}
      >
        <span className="flex items-center gap-2">
          <Icon name={item.icon as IconName} size={20} color="#265197" />
          <Text variant="label" color="#265197">{item.title}</Text>
        </span>
        <Icon name="ChevronDown" size={16} color="#265197" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>
      {isOpen && item.subItems && (
        <div className="ml-6 mt-2 flex flex-col gap-2">
          {item.subItems.map((subItem) => {
            const isActive = pathname === subItem.href;
            return (
              <Button
                isAdmin={true}
                variant="flat"
                key={subItem.title}
                className={`justify-start px-4 py-2 transition-colors hover:bg-[#EEF1F7] hover:text-[#16305A] ${isActive ? "bg-[#EEF1F7]" : ""}`}
                onClick={() => router.push(subItem.href)}
              >
                <Text variant="label" color={isActive ? "#16305A" : "#1b439b"} weight={isActive ? "bold" : "normal"}>{subItem.title}</Text>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ items }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})
  const [companyName] = useState<string | null>(null)
  const pathname = usePathname();
  const router = useRouter();
  // TODO: Descomentar cuando se configure Supabase
  // const { userInfo } = UserAuth();
  // const { supabase } = useSupabase();

  // TODO: Descomentar cuando se configure Supabase
  // Obtener el nombre de la empresa del usuario (para clientes)
  // useEffect(() => {
  //   const fetchCompanyName = async () => {
  //     if (!userInfo?.id) return;
  //     try {
  //       const { data: userData, error: userError } = await supabase
  //         .from('users')
  //         .select('first_name, last_name')
  //         .eq('id', userInfo.id)
  //         .maybeSingle();
  //       if (userError) {
  //         console.error('Error al obtener usuario:', userError);
  //         return;
  //       }
  //       if (userData) {
  //         setCompanyName(`${userData.first_name} ${userData.last_name}`);
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener nombre de usuario:', error);
  //     }
  //   };
  //   fetchCompanyName();
  // }, [userInfo, supabase]);

  // Verificar si alguna subopción está activa para mantener el acordeón abierto
  const isSubItemActive = (item: MenuItem): boolean => {
    if (!item.subItems) return false;
    return item.subItems.some(subItem => pathname.startsWith(subItem.href));
  }

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const NavItems = () => (
    <div className="h-[100svh] w-full overflow-y-auto px-2 py-4 bg-sidebar">
      {/* Logo - solo visible en pantallas grandes */}
      <div className="hidden lg:flex flex-col justify-start items-start mb-2">
        <img
          src="/img/citrica-logo.png"
          alt="Citrica Logo"
          className="m-4 h-8 w-40 object-contain"
        />
        {/* Nombre del usuario/empresa */}
        {companyName && (
          <div className="px-4 pb-2 w-full text-start">
            <Text variant="body" color="#16305A" className="font-semibold">
              {companyName}
            </Text>
          </div>
        )}
      </div>
      {items.map((item) => (
        <div key={item.title} className="mb-2">
          {item.subItems ? (
            <Suspense fallback={<div>Cargando...</div>}>
              <AccordionItem
                item={item}
                isOpen={openItems[item.title] !== undefined ? openItems[item.title] : isSubItemActive(item)}
                onToggle={() => toggleItem(item.title)}
              />
            </Suspense>
          ) : (

            <Button
              isAdmin={true}
              className={`w-full justify-start gap-2 px-4 py-2 transition-colors hover:bg-[#f0f9ff] ${item.href === pathname ? "bg-[#e0f2fe]" : ""}`}
              onClick={() => {
                if (item.href && item.href !== "#") {
                  router.push(item.href);
                }
              }}
            >
              <Icon name={item.icon as IconName} size={20} color="#265197" />
              <Text variant="label" color={item.href === pathname ? "#000" : "#8099B2"}>{item.title}</Text>
            </Button>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Mobile Drawer */}
      <Button className="md:hidden" onClick={() => setIsOpen(true)}>
        <Icon name="Menu" size={20} />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-sidebar transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-[rgba(0,180,216,0.2)]">
          <Text variant="body" color="#00226c" weight="bold">Navegación</Text>
          <Button onClick={() => setIsOpen(false)}>
            <Icon name="ChevronDown" size={20} color="#265197" className="rotate-90" />
          </Button>
        </div>
        <NavItems />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden h-screen w-72 border-r bg-background md:block sticky top-0">
        <NavItems />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
