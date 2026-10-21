"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Section, Stack } from "@/shared/components/layout";

/**
 * "El marketing no es presencia. Es flujo de comensales."
 * Entrada al método: reencuadra qué se está comprando.
 */
const Solucion = () => (
  <Section id="solucion" tone="surface">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 7 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-black" variant="headline">
            El marketing no es presencia. Es flujo de comensales.
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            No vendemos publicaciones ni seguidores. Montamos una máquina que
            entra gente por la puerta y te enseña, semana a semana, de dónde
            vino cada reserva y cuánto costó.
          </Text>
        </Stack>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 5 }}>
        <Stack gap={2}>
          <Text as="p" textColor="color-text-black" variant="title">
            Lo que cambia
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-on-surface-var"
            variant="body"
          >
            Dejas de preguntarte si funcionó. Abres el informe del lunes y lo
            ves: cuántas reservas, de qué canal, a qué costo por comensal.
          </Text>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Solucion;
