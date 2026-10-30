"use client";

import { Button, Col, Container, Text } from "citrica-ui-toolkit";

import { MENSAJE_DEMO, MENSAJE_PRUEBA, abrirWhatsapp } from "./cuenta";

import { Cluster, Section, Stack } from "@/shared/components/layout";

/**
 * Cierre en azul (`inverse`). El secundario usa los tokens reasignados en
 * `.test-1-sin-brief__inverse`: contorno crema que se rellena al hover.
 */
const CtaFinal = () => (
  <Section
    className="test-1-sin-brief__inverse"
    id="demo"
    rhythm="airy"
    tone="inverse"
  >
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-white" variant="headline">
            Haz la cuenta con tu número real
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-text-white"
            variant="subtitle"
          >
            En la demo vemos tu local, tus canales y tu cierre de hoy. Si
            prefieres probar primero, tienes 7 días gratis.
          </Text>
          <Cluster align="center" gap={4}>
            <Button
              label="Pedir demo por WhatsApp"
              textVariant="body"
              variant="primary"
              onPress={() => abrirWhatsapp(MENSAJE_DEMO)}
            />
            <Button
              label="Probar 7 días gratis"
              textVariant="body"
              variant="secondary"
              onPress={() => abrirWhatsapp(MENSAJE_PRUEBA)}
            />
          </Cluster>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default CtaFinal;
