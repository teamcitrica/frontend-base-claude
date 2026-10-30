"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import {
  COMISION_REFERENCIA,
  COSTO_FIJO_USD,
  formatUSD,
  porcentaje,
} from "./cuenta";

import { Cluster, Stack } from "@/shared/components/layout";

/**
 * Pie propio, no el `Footer` del toolkit: sus props por defecto apuntan a
 * otra marca. Aquí se explica qué cifras son de referencia y qué es muestra.
 */
const SiteFooter = () => (
  <footer className="test-1-sin-brief__footer">
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
            Las cifras de esta página son valores de referencia:{" "}
            {porcentaje(COMISION_REFERENCIA)} de comisión por venta y{" "}
            {formatUSD(COSTO_FIJO_USD)} al mes de costo fijo. El precio
            definitivo se confirma en la demo.
          </Text>
          <Cluster gap={4} justify="between">
            <Text as="p" textColor="color-on-surface-var" variant="label">
              © {new Date().getFullYear()} Resto App
            </Text>
            <Text as="p" textColor="color-on-surface-var" variant="label">
              Fotografía de muestra: Unsplash
            </Text>
          </Cluster>
        </Stack>
      </Col>
    </Container>
  </footer>
);

export default SiteFooter;
