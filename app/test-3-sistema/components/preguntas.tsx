"use client";

import { Accordion, Col, Container, Text } from "citrica-ui-toolkit";

import { Section, Stack } from "@/shared/components/layout";

// Preguntas del brief, sección 8.
const PREGUNTAS = [
  {
    pregunta: "¿Cómo se cobra el sistema y por qué el contrato es anual?",
    respuesta:
      "Se cobra una tarifa fija y predecible que te deja planificar el presupuesto del año, sin castigar el crecimiento de tus ventas.",
  },
  {
    pregunta: "¿Hay que instalar programas complejos?",
    respuesta:
      "No. Funciona en la web y en dispositivos móviles estándar, sin instalaciones pesadas.",
  },
  {
    pregunta: "¿Trabaja con Pago Móvil, Zelle y divisa en efectivo?",
    respuesta:
      "Sí. Registra cada moneda en su cuenta, con el tipo de cambio actualizado.",
  },
  {
    pregunta: "¿Sirve para locales sin salón o dark kitchens?",
    respuesta: "Sí. El flujo se adapta a mostrador y a delivery exclusivo.",
  },
];

const ITEMS = PREGUNTAS.map(({ pregunta, respuesta }) => ({
  key: pregunta,
  title: (
    <Text
      as="span"
      textColor="color-on-surface"
      variant="subtitle"
      weight="bold"
    >
      {pregunta}
    </Text>
  ),
  ariaLabel: pregunta,
  // Bajo el h2 "Preguntas frecuentes": el Accordion pinta h2 por defecto.
  headingComponent: "h3" as const,
  content: (
    <Text as="p" textColor="color-on-surface-var" variant="body">
      {respuesta}
    </Text>
  ),
}));

/** Preguntas frecuentes: una abierta a la vez, todas cerradas al cargar. */
const Preguntas = () => (
  <Section id="preguntas">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8 }}>
        <Stack gap={8}>
          <Text as="h2" textColor="color-on-surface" variant="headline">
            Preguntas frecuentes
          </Text>
          <Accordion items={ITEMS} selectionMode="single" variant="splitted" />
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Preguntas;
