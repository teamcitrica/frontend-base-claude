"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import {
  COSTO_FIJO_USD,
  formatUSD,
} from "@/app/test-1-sin-brief/components/cuenta";
import { Stack } from "@/shared/components/layout";

/**
 * Pie propio, no el `Footer` del toolkit (sus props por defecto son de otra
 * marca). Explica qué es referencia y qué es muestra.
 */
const SiteFooter = () => (
  <footer className="test-2-corto__footer">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Stack gap={4}>
          <Text as="p" textColor="color-on-surface" variant="headline">
            Resto App
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="body"
          >
            Precio de referencia: {formatUSD(COSTO_FIJO_USD)} al mes, sin
            comisión por venta. Las pantallas de la app que se muestran arriba
            usan datos de muestra.
          </Text>
          <Text as="p" textColor="color-on-surface-var" variant="label">
            © {new Date().getFullYear()} Resto App
          </Text>
        </Stack>
      </Col>
    </Container>
  </footer>
);

export default SiteFooter;
