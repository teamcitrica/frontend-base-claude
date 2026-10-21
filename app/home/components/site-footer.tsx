"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { siteConfig } from "@/config/site";
import { Cluster, Stack } from "@/shared/components/layout";

/**
 * Footer propio, no el `Footer` del toolkit: sus props están cableadas a
 * otra marca (`logoSrc` por defecto apunta a un logo de Gáliz, `companyName`
 * también) y su API es de logos + redes, no de créditos de fotografía.
 *
 * No es un `Section`: su aire (64px arriba, 40px abajo) no es ninguno de los
 * ritmos de sección, así que lo pone el gesto `home__footer`.
 *
 * El crédito a Unsplash es genérico a propósito: el CDN no expone el autor
 * y la API necesita clave. El crédito nominal por fotógrafo queda pendiente
 * y no se inventa.
 */
const Footer = () => (
  <footer className="home__footer">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Stack gap={6}>
          <Cluster gap={6} justify="between">
            <Text as="p" textColor="color-text-white" variant="title">
              {siteConfig.name}
            </Text>
            <Text
              as="p"
              className="u-measure-narrow"
              textColor="color-text-white"
              variant="body"
            >
              Del plato a la pantalla, de la pantalla a la mesa llena.
            </Text>
          </Cluster>

          <hr className="home__footer-rule" />

          <Cluster gap={2} justify="between">
            <Text as="p" textColor="color-text-white" variant="label">
              © {new Date().getFullYear()} {siteConfig.name}
            </Text>
            <Text as="p" textColor="color-text-white" variant="label">
              Fotografía: Unsplash
            </Text>
          </Cluster>
        </Stack>
      </Col>
    </Container>
  </footer>
);

export default Footer;
