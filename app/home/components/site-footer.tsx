"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { siteConfig } from "@/config/site";

/**
 * Footer propio, no el `Footer` del toolkit: sus props están cableadas a
 * otra marca (`logoSrc` por defecto apunta a un logo de Gáliz, `companyName`
 * también) y su API es de logos + redes, no de créditos de fotografía.
 *
 * El crédito a Unsplash es genérico a propósito: el CDN no expone el autor
 * y la API necesita clave. El crédito nominal por fotógrafo queda pendiente
 * y no se inventa.
 */
const Footer = () => (
  <footer className="home__footer">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <div className="home__footer-top">
          <Text as="p" textColor="color-text-white" variant="title">
            {siteConfig.name}
          </Text>
          <Text
            as="p"
            className="home__measure--narrow"
            textColor="color-text-white"
            variant="body"
          >
            Del plato a la pantalla, de la pantalla a la mesa llena.
          </Text>
        </div>

        <div className="home__footer-bottom">
          <Text as="p" textColor="color-text-white" variant="label">
            © {new Date().getFullYear()} {siteConfig.name}
          </Text>
          <Text as="p" textColor="color-text-white" variant="label">
            Fotografía: Unsplash
          </Text>
        </div>
      </Col>
    </Container>
  </footer>
);

export default Footer;
