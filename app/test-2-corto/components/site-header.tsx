"use client";

import { Header, Text } from "citrica-ui-toolkit";

import {
  MENSAJE_DEMO,
  abrirWhatsapp,
} from "@/app/test-1-sin-brief/components/cuenta";

const NAV_ITEMS = [
  { title: "Qué incluye", href: "#incluye" },
  { title: "Precio", href: "#precio" },
];

/**
 * Header del toolkit en crema sobre el hero azul. Sin `logo`, el toolkit pinta
 * "Matour": va el wordmark TEMPORAL "Resto App" hasta que llegue el logo real.
 */
const SiteHeader = () => (
  <Header
    showButton
    backgroundColor="var(--color-surface)"
    buttonText="Pedir demo"
    logo={
      <Text
        as="span"
        className="test-2-corto__wordmark"
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
