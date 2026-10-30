"use client";

import { Button, Col, Container, Text } from "citrica-ui-toolkit";

import {
  MENSAJE_DEMO,
  abrirWhatsapp,
} from "@/app/test-1-sin-brief/components/cuenta";
import { Section, Stack } from "@/shared/components/layout";

/** Cierre en la banda azul: un solo CTA, el mismo del hero. */
const CtaFinal = () => (
  <Section
    className="test-2-corto__inverse"
    id="demo"
    rhythm="airy"
    tone="inverse"
  >
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-white" variant="headline">
            Mira tu local en un solo cierre
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-text-white"
            variant="subtitle"
          >
            En la demo vemos tus canales de venta y cómo quedan en el cierre de
            caja y bancos.
          </Text>
          <span>
            <Button
              label="Pedir demo por WhatsApp"
              textVariant="body"
              variant="primary"
              onPress={() => abrirWhatsapp(MENSAJE_DEMO)}
            />
          </span>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default CtaFinal;
