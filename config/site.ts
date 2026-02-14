export type SiteConfig = typeof siteConfig;

const ROL_ADMIN = 1;
const ROL_CLIENTE = 12;
const SUBITEM_SEARCH_PARAM = "page";

export const siteConfig = {
  name: "Frontend Base - Claude",
  description: "A base template for building admin dashboards with Next.js and NextUI.",
  navLinks: [
    {
      title: "CURSO",
      href: "#hero",
    },
    {
      title: "EXÁMEN",
      href: "#contenido",
    },
    {
      title: "REDDI",
      href: "#galeria",
    },
    {
      title: "NOSOTROS",
      href: "#instructor",
    },
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
			subItems: [
			],
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
