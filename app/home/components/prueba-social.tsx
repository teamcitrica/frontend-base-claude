"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Cluster, Section, Stack } from "@/shared/components/layout";

/**
 * Tira de prueba social. Va inmediatamente después del hero porque el
 * visitante llega quemado por agencias y necesita un número antes de leer
 * un párrafo. Métricas sueltas, no cards: la rejilla de cards idénticas
 * restaría fuerza al número.
 */
const metrics = [
  { value: "+180%", label: "reservas en 3 meses" }, // ILUSTRATIVO
  { value: "90 días", label: "para ver flujo constante" }, // ILUSTRATIVO
  { value: "1 informe", label: "cada semana, sin adornos" }, // ILUSTRATIVO
];

const PruebaSocial = () => (
  <Section id="prueba" rhythm="tight">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Cluster align="start" as="ul" gap={{ row: 10, column: 24 }}>
          {metrics.map((metric) => (
            <Stack key={metric.label} as="li" className="home__metric" gap={1}>
              <Text as="span" textColor="color-primary" variant="headline">
                {metric.value}
              </Text>
              <Text as="span" textColor="color-on-surface-var" variant="label">
                {metric.label}
              </Text>
            </Stack>
          ))}
        </Cluster>
      </Col>
    </Container>
  </Section>
);

export default PruebaSocial;
