"use client";

import { Text } from "citrica-ui-toolkit";

import {
  Cell,
  Cluster,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";
import {
  AccountRow,
  DemoButton,
  TicketCard,
  TotalBand,
  TrialButton,
  formatUSD,
} from "@/shared/project-components/resto-app";

// Cierre DE MUESTRA: no hay datos reales de un local (SPEC-0007).
const CIERRE = [
  { canal: "Salón", monto: 640 },
  { canal: "Mostrador", monto: 310 },
  { canal: "Delivery propio", monto: 280 },
  { canal: "Menú web", monto: 170 },
];

/**
 * Hero — la promesa y el cierre del turno al lado: los cuatro canales cuadran
 * en un solo total. En sm: titular, bajada y CTA primero; el ticket debajo.
 */
const Hero = () => (
  <Section id="inicio" rhythm="airy">
    <Grid rowGap={10}>
      <Cell align="center" span={{ sm: 4, md: 6, lg: 7 }}>
        <Stack gap={6}>
          <Text as="h1" textColor="color-on-surface" variant="display">
            Todo tu restaurante en un solo sistema. Sin comisiones por venta.
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Salón, mostrador, delivery propio y menú web integrados en un solo
            flujo. Cocina, caja y bancos salen del mismo cierre.
          </Text>
          <Cluster align="center" gap={4}>
            <DemoButton />
            <TrialButton />
          </Cluster>
        </Stack>
      </Cell>

      <Cell align="center" span={{ sm: 4, md: 6, lg: 5 }} start={{ lg: 8 }}>
        <TicketCard tag="Muestra" title="Cierre del turno" titleAs="p">
          <Stack gap={1}>
            {CIERRE.map(({ canal, monto }) => (
              <AccountRow key={canal} label={canal} value={formatUSD(monto)} />
            ))}
          </Stack>
          <TotalBand
            label="Un solo cierre"
            value={formatUSD(
              CIERRE.reduce((total, { monto }) => total + monto, 0),
            )}
          />
        </TicketCard>
      </Cell>
    </Grid>
  </Section>
);

export default Hero;
