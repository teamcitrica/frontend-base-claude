"use client";

import { Button, Text } from "citrica-ui-toolkit";

import Calculadora from "./calculadora";
import { MENSAJE_DEMO, MENSAJE_PRUEBA, abrirWhatsapp } from "./cuenta";

import {
  Cell,
  Cluster,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";

/**
 * Hero — la tesis entera en el primer viewport: el titular invita a hacer la
 * cuenta y la calculadora está al lado para hacerla. En sm apila titular,
 * CTA y calculadora, para que el CTA quede dentro del fold.
 */
const Hero = () => (
  <Section id="inicio" rhythm="airy">
    <Grid rowGap={10}>
      <Cell align="center" span={{ sm: 4, md: 6, lg: 6 }}>
        <Stack gap={6}>
          <Text as="h1" textColor="color-on-surface" variant="display">
            Haz la cuenta: ¿cuánto se te va en comisiones?
          </Text>

          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Salón, mostrador, delivery propio y menú web entran al mismo flujo.
            Cocina, caja y bancos salen del mismo cierre. Pagas un costo fijo al
            mes, sin comisión por venta.
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
      </Cell>

      <Cell span={{ sm: 4, md: 6, lg: 6 }} start={{ lg: 7 }}>
        <Calculadora />
      </Cell>
    </Grid>
  </Section>
);

export default Hero;
