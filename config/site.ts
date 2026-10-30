export type SiteConfig = typeof siteConfig;

const ROL_ADMIN = 1;
const ROL_CLIENTE = 12;
const SUBITEM_SEARCH_PARAM = "page";

export const siteConfig = {
  name: "Resto App",
  description:
    "Sistema todo-en-uno para restaurantes, dark kitchens, bares y cafeterías. Costo fijo mensual, sin comisión por venta.",

  // Marca de la base: Resto App (ADR-0009). `colors` va en sincronía con
  // styles/10-tokens/web/colors/_palette.scss (primary / surface / on-surface).
  seo: {
    url: "https://frontend-base-claude.vercel.app",
    siteName: "Resto App",
    title: "Resto App — Todo tu local, un solo cierre",
    description:
      "Salón, mostrador, delivery propio y menú web entran al mismo flujo; cocina, caja y bancos salen del mismo cierre. Costo fijo mensual, sin comisión por venta.",
    tagline: "Todo tu local, un solo cierre",
    imageAlt: "Resto App — sistema todo-en-uno para restaurantes",
    locale: "es_VE",
    keywords: [
      "sistema para restaurantes",
      "punto de venta restaurante",
      "delivery propio",
      "menú web",
      "Venezuela",
    ] as string[],
    twitter: {
      site: "",
      creator: "",
    },
    colors: {
      brand: "#F95738",
      background: "#F5F5EA",
      foreground: "#083D77",
    },
    ogFont: "Manrope-ExtraBold.ttf",
    indexable: true,
  },

  // Navegación de la landing: anclas a los `id` de sus secciones.
  navLinks: [
    { title: "El problema", href: "#problema" },
    { title: "Cómo funciona", href: "#metodo" },
    { title: "Resultados", href: "#resultados" },
    { title: "Garantía", href: "#garantia" },
  ],
  subItemSearchParam: SUBITEM_SEARCH_PARAM, // FOR SUBSECTIONS IN SIDEBAR
  sidebarItems: [
    {
      title: "USUARIOS DE SISTEMA",
      icon: "Users",
      href: "/admin/users",
      allowedRoles: [ROL_ADMIN],
      subItems: [
        {
          title: "Usuarios",
          href: "/admin/users/usuarios",
        },
      ],
    },
    {
      title: "HOME",
      icon: "Settings",
      href: "/",
      allowedRoles: [ROL_ADMIN],
      subItems: [],
    },
    {
      title: "CLIENTES",
      icon: "Users",
      href: "/admin/clientes",
      allowedRoles: [ROL_ADMIN],
      subItems: [
        {
          title: "Usuarios",
          href: "/admin/clientes/",
        },
      ],
    },
    {
      title: "RESERVAS",
      icon: "Settings",
      href: "/admin/reservas", // ONLY TO DETERMINE ACTIVE, IS NOT LINKING
      subItems: [
        {
          title: "Ver Reservas",
          href: "/admin/reservas?" + SUBITEM_SEARCH_PARAM + "=lista",
        },
        {
          title: "Calendario",
          href: "/admin/reservas?" + SUBITEM_SEARCH_PARAM + "=calendario",
        },
        {
          title: "Gestión de Disponibilidad",
          href: "/admin/reservas?" + SUBITEM_SEARCH_PARAM + "=disponibilidad",
        },
      ],
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
