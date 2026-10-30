"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Cluster, Section, Stack } from "@/shared/components/layout";
import { DemoButton, TrialButton } from "@/shared/project-components/resto-app";

/**
 * Cierre en la banda azul (brief, sección 9). El teléfono de atención queda
 * PENDIENTE hasta tener el real; se muestra solo el horario.
 */
const Cierre = () => (
  <Section id="demo" rhythm="airy" tone="inverse">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-white" variant="headline">
            Cuéntanos cómo trabaja tu local.
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-text-white"
            variant="subtitle"
          >
            Dinos cuántas mesas manejas, tu personal y tus canales de venta. Te
            decimos sin vueltas si Resto App es para ti.
          </Text>
          <Cluster align="center" gap={4}>
            <DemoButton />
            <TrialButton />
          </Cluster>
          <Text as="p" textColor="color-text-white" variant="label">
            Atención de lunes a sábado, de 9:00 a 20:00.
          </Text>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Cierre;
