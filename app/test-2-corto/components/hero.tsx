"use client";

import { Button, Text } from "citrica-ui-toolkit";

import { MockCierre, MockPedidos } from "./mock-cierre";

import {
  MENSAJE_DEMO,
  abrirWhatsapp,
} from "@/app/test-1-sin-brief/components/cuenta";
import {
  Cell,
  Cluster,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";

/**
 * Hero — composición del comp Glassmorphism con la marca de Resto App.
 * Pila de tres paneles de vidrio en la misma fila del Grid (dos traseros
 * desplazados, solo en lg) y el frontal con el texto; los mocks solapan la
 * pila a la derecha y el badge va arriba. El orden del DOM decide quién va
 * encima. En sm: un solo vidrio, titular → bajada → CTA, y un mock debajo.
 */
const Hero = () => (
  <Section className="test-2-corto__ambient" id="inicio" rhythm="none">
    <Grid rowGap={6}>
      <Cell
        className="test-2-corto__badge-cell"
        row={{ lg: 1 }}
        span={{ md: 3, lg: 3 }}
        start={{ md: 4, lg: 10 }}
      >
        <Cluster
          align="center"
          className="test-2-corto__glass test-2-corto__badge"
          gap={2}
          wrap={false}
        >
          <Text as="span" textColor="color-text-white" variant="label">
            Para restaurantes de Venezuela
          </Text>
        </Cluster>
      </Cell>

      <Cell
        aria-hidden
        className="test-2-corto__glass test-2-corto__glass--back test-2-corto__glass--up"
        row={{ lg: 2 }}
        span={{ lg: 8 }}
        start={{ lg: 3 }}
      />
      <Cell
        aria-hidden
        className="test-2-corto__glass test-2-corto__glass--back test-2-corto__glass--down"
        row={{ lg: 2 }}
        span={{ lg: 10 }}
        start={{ lg: 1 }}
      />

      <Cell
        align="center"
        className="test-2-corto__glass test-2-corto__glass--front"
        row={{ lg: 2 }}
        span={{ sm: 4, md: 6, lg: 9 }}
        start={{ lg: 2 }}
      >
        <Stack className="test-2-corto__center test-2-corto__copy" gap={6}>
          <Text as="h1" textColor="color-text-white" variant="display">
            Todo tu local, un solo cierre
          </Text>
          <Text as="p" textColor="color-text-white" variant="subtitle">
            Costo fijo mensual y cero comisión por cada venta.
          </Text>
          <span>
            <span className="test-2-corto__glow">
              <Button
                label="Pedir demo por WhatsApp"
                textVariant="body"
                variant="primary"
                onPress={() => abrirWhatsapp(MENSAJE_DEMO)}
              />
            </span>
          </span>
        </Stack>
      </Cell>

      <Cell
        align="center"
        row={{ lg: 2 }}
        span={{ sm: 4, md: 6, lg: 4 }}
        start={{ lg: 9 }}
      >
        <Text as="p" className="sr-only" variant="body">
          Ejemplo de la app con datos de muestra: el cierre de hoy suma salón,
          mostrador, delivery y menú web en un solo total.
        </Text>
        <Cluster aria-hidden align="start" gap={3} wrap={false}>
          <div className="test-2-corto__phone-slot test-2-corto__phone-slot--small">
            <MockPedidos />
          </div>
          <div className="test-2-corto__phone-slot">
            <MockCierre />
          </div>
        </Cluster>
      </Cell>
    </Grid>
  </Section>
);

export default Hero;
