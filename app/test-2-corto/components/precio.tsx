"use client";

import { Card, Text } from "citrica-ui-toolkit";

import {
  COSTO_FIJO_USD,
  formatUSD,
} from "@/app/test-1-sin-brief/components/cuenta";
import {
  Cell,
  Cluster,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";

const LINEAS = [
  { concepto: "Plan mensual", monto: formatUSD(COSTO_FIJO_USD) },
  { concepto: "Comisión por venta", monto: formatUSD(0) },
];

/** Precio en formato ticket. El monto es DE MUESTRA (valor de referencia). */
const Precio = () => (
  <Section id="precio">
    <Grid rowGap={10}>
      <Cell align="center" span={{ sm: 4, md: 6, lg: 5 }}>
        <Stack gap={4}>
          <Text as="h2" textColor="color-on-surface" variant="headline">
            Un costo fijo, cero comisión
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Pagas lo mismo cada mes, vendas lo que vendas.
          </Text>
        </Stack>
      </Cell>

      <Cell span={{ sm: 4, md: 6, lg: 6 }} start={{ lg: 7 }}>
        <Card className="test-2-corto__ticket" radius="lg" shadow="none">
          <Stack gap={4}>
            <Stack gap={1}>
              {LINEAS.map(({ concepto, monto }) => (
                <Cluster
                  key={concepto}
                  align="center"
                  className="test-2-corto__row"
                  gap={4}
                  justify="between"
                  wrap={false}
                >
                  <Text
                    as="span"
                    textColor="color-on-surface-var"
                    variant="body"
                  >
                    {concepto}
                  </Text>
                  <Text
                    as="span"
                    className="test-2-corto__figure"
                    textColor="color-on-surface"
                    variant="subtitle"
                    weight="bold"
                  >
                    {monto}
                  </Text>
                </Cluster>
              ))}
            </Stack>

            <Cluster
              align="center"
              className="test-2-corto__total"
              gap={4}
              justify="between"
            >
              <Text as="span" textColor="color-on-tertiary" variant="title">
                Pagas al mes
              </Text>
              <Text
                as="span"
                className="test-2-corto__figure"
                textColor="color-on-tertiary"
                variant="title"
              >
                {formatUSD(COSTO_FIJO_USD)}
              </Text>
            </Cluster>

            <Text as="p" textColor="color-on-surface-var" variant="label">
              Precio de referencia. Confírmalo en la demo.
            </Text>
          </Stack>
        </Card>
      </Cell>
    </Grid>
  </Section>
);

export default Precio;
