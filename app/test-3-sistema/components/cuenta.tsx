"use client";

import { useState } from "react";
import { Text } from "citrica-ui-toolkit";

import {
  AutoGrid,
  Cell,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";
import {
  AccountRow,
  AmountField,
  COMISION_EJEMPLO,
  DIGITOS_PORCENTAJE,
  DIGITOS_VENTAS,
  QuoteButton,
  TicketCard,
  TotalBand,
  VENTAS_MUESTRA,
  comisionPerdida,
  formatUSD,
  leerDigitos,
} from "@/shared/project-components/resto-app";

// Modelo de cobro del brief (sección 7), sin precio: no hay precio público.
const CON_RESTO = [
  { label: "Monto mensual", value: "Fijo" },
  { label: "Comisión por venta", value: "0 %" },
  { label: "Contrato", value: "Anual" },
  {
    label: "Soporte",
    note: "Lunes a sábado",
    value: "9:00–20:00",
  },
  { label: "Actualizaciones", value: "Incluidas" },
];

/**
 * La cuenta de la comisión: la visitante escribe sus ventas y el % que paga
 * hoy, y ve lo que se le va al mes y al año. Cierra con cotizar el plan fijo.
 */
const Cuenta = () => {
  const [ventas, setVentas] = useState(String(VENTAS_MUESTRA));
  const [comision, setComision] = useState(String(COMISION_EJEMPLO * 100));
  const perdida = comisionPerdida(
    leerDigitos(ventas, DIGITOS_VENTAS).valor,
    leerDigitos(comision, DIGITOS_PORCENTAJE).valor / 100,
  );

  return (
    <Section id="cuenta" rhythm="airy">
      <Grid rowGap={10}>
        <Cell span={{ sm: 4, md: 6, lg: 5 }}>
          <Stack gap={8}>
            <Stack gap={4}>
              <Text as="h2" textColor="color-on-surface" variant="headline">
                La cuenta de la comisión
              </Text>
              <Text
                as="p"
                className="u-measure-narrow"
                textColor="color-on-surface-var"
                variant="subtitle"
              >
                Vender más no debería subir lo que pagas por tu sistema. Mira
                cuánto se te va hoy.
              </Text>
            </Stack>
            <TicketCard title="Con Resto App">
              <Stack gap={1}>
                {CON_RESTO.map(({ label, note, value }) => (
                  <AccountRow
                    key={label}
                    label={label}
                    note={note}
                    value={value}
                  />
                ))}
              </Stack>
            </TicketCard>
          </Stack>
        </Cell>

        <Cell span={{ sm: 4, md: 6, lg: 6 }} start={{ lg: 7 }}>
          <TicketCard title="Tu cuenta de hoy">
            <AutoGrid gap={4} minItemWidth={220}>
              <AmountField
                description="Lo que vende tu local en un mes."
                label="Ventas del mes"
                maxDigits={DIGITOS_VENTAS}
                prefix="USD"
                value={ventas}
                onValueChange={setVentas}
              />
              <AmountField
                description="La que te cobran hoy por cada venta."
                label="Comisión por venta"
                maxDigits={DIGITOS_PORCENTAJE}
                suffix="%"
                value={comision}
                onValueChange={setComision}
              />
            </AutoGrid>

            <Stack aria-live="polite" gap={4}>
              <AccountRow
                label="En comisiones al mes"
                value={formatUSD(perdida.mes)}
              />
              <TotalBand
                label="Se te va al año"
                value={formatUSD(perdida.anio)}
              />
            </Stack>

            <Stack gap={4}>
              <Text as="p" textColor="color-on-surface" variant="body">
                Con Resto App pagas un monto fijo y cero comisión. Te lo
                cotizamos por WhatsApp.
              </Text>
              <QuoteButton fullWidth />
              <Text as="p" textColor="color-on-surface-var" variant="label">
                Valores de ejemplo: cámbialos por los de tu local.
              </Text>
            </Stack>
          </TicketCard>
        </Cell>
      </Grid>
    </Section>
  );
};

export default Cuenta;
