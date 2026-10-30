"use client";

import { Text } from "citrica-ui-toolkit";

import { Cell, Grid, Section, Stack } from "@/shared/components/layout";
import {
  AccountRow,
  ModuleCard,
  TicketCard,
  TotalBand,
  formatUSD,
} from "@/shared/project-components/resto-app";

// Ejemplo del brief (sección 5), solo con las cifras legibles: el texto llegó
// cortado y el "4.45" no se usa (decisión del usuario, SPEC-0007).
const PEDIDO = 12;
const INSUMOS = 4.35;
const EMPAQUE = 0.8;

/** Finanzas y cierre: tesorería multi-divisa y el costo real de cada pedido. */
const Finanzas = () => (
  <Section>
    <Grid rowGap={8}>
      <Cell span={{ sm: 4, md: 6, lg: 12 }}>
        <Text as="h2" textColor="color-on-surface" variant="headline">
          Cuando el local cierra
        </Text>
      </Cell>

      <Cell span={{ sm: 4, md: 6, lg: 6 }}>
        <Stack gap={6}>
          <ModuleCard icon="Wallet" title="Tesorería multi-divisa">
            Cuentas en bolívares (VES) y dólares (USD) con tipos de cambio
            independientes. Cada ingreso se clasifica solo: Pago Móvil, Zelle,
            punto de venta, transferencias y efectivo.
          </ModuleCard>
          <ModuleCard icon="Package" title="Costo real de empaques e insumos">
            El inventario descuenta solo los cubiertos, bolsas y envases de cada
            delivery. Sabes cuánto te deja un pedido sin estimar a ciegas.
          </ModuleCard>
        </Stack>
      </Cell>

      <Cell span={{ sm: 4, md: 6, lg: 5 }} start={{ lg: 8 }}>
        <TicketCard tag="Ejemplo" title="Un pedido de delivery">
          <Stack gap={1}>
            <AccountRow label="Pedido" value={formatUSD(PEDIDO, true)} />
            <AccountRow
              label="Insumos"
              sign="minus"
              value={formatUSD(INSUMOS, true)}
            />
            <AccountRow
              label="Empaque"
              note="Bolsa, envase y cubiertos"
              sign="minus"
              value={formatUSD(EMPAQUE, true)}
            />
          </Stack>
          <TotalBand
            label="Te queda"
            value={formatUSD(PEDIDO - INSUMOS - EMPAQUE, true)}
          />
        </TicketCard>
      </Cell>
    </Grid>
  </Section>
);

export default Finanzas;
