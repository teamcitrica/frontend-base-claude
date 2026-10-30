"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Section, Stack } from "@/shared/components/layout";
import { BrandLogo } from "@/shared/project-components/resto-app";

/**
 * Pie propio, no el `Footer` del toolkit (sus props por defecto son de otra
 * marca). Sigue al cierre en la misma banda azul, con el logo light.
 */
const SiteFooter = () => (
  <Section as="footer" rhythm="tight" tone="inverse">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Stack gap={4}>
          <BrandLogo size="lg" tone="light" />
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-text-white"
            variant="body"
          >
            Sistema todo-en-uno para restaurantes, dark kitchens, bares y
            cafeterías en Venezuela. Monto fijo mensual, cero comisión por
            venta. Las cifras de los tickets de esta página son de muestra o de
            ejemplo.
          </Text>
          <Text as="p" textColor="color-text-white" variant="label">
            © {new Date().getFullYear()} Resto App
          </Text>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default SiteFooter;
