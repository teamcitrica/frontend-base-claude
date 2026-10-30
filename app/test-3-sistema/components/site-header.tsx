"use client";

import { Header } from "citrica-ui-toolkit";

import {
  BrandLogo,
  MENSAJE_DEMO,
  abrirWhatsapp,
} from "@/shared/project-components/resto-app";

const NAV_ITEMS = [
  { title: "Cómo funciona", href: "#flujo" },
  { title: "La cuenta", href: "#cuenta" },
  { title: "Preguntas", href: "#preguntas" },
];

/** Header del toolkit sobre la crema, con el logo real (versión azul). */
const SiteHeader = () => (
  <Header
    showButton
    backgroundColor="var(--color-surface)"
    buttonText="Pedir demo"
    logo={<BrandLogo priority />}
    navItems={NAV_ITEMS}
    variant="basic"
    onButtonClick={() => abrirWhatsapp(MENSAJE_DEMO)}
  />
);

export default SiteHeader;
