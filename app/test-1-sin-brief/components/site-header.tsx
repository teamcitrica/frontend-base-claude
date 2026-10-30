"use client";

import { Header, Text } from "citrica-ui-toolkit";

import { MENSAJE_DEMO, abrirWhatsapp } from "./cuenta";

const NAV_ITEMS = [
  { title: "Haz la cuenta", href: "#inicio" },
  { title: "Cómo funciona", href: "#flujo" },
  { title: "Precio", href: "#precio" },
];

/**
 * Header del toolkit sobre la crema. Sin `logo`, el toolkit pinta "Matour":
 * aquí va un wordmark TEMPORAL en Oleo Script hasta que llegue el logo real.
 */
const SiteHeader = () => (
  <Header
    showButton
    backgroundColor="var(--color-surface)"
    buttonText="Pedir demo"
    logo={
      <Text
        as="span"
        className="test-1-sin-brief__wordmark"
        textColor="color-on-surface"
        variant="headline"
      >
        Resto App
      </Text>
    }
    navItems={NAV_ITEMS}
    variant="basic"
    onButtonClick={() => abrirWhatsapp(MENSAJE_DEMO)}
  />
);

export default SiteHeader;
