"use client";

import { Icon, Text, type IconName } from "citrica-ui-toolkit";

import {
  AutoGrid,
  Cell,
  Cluster,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";

interface Canal {
  icono: IconName;
  nombre: string;
}

const ENTRA: Canal[] = [
  { icono: "Utensils", nombre: "Salón" },
  { icono: "Store", nombre: "Mostrador" },
  { icono: "Bike", nombre: "Delivery propio" },
  { icono: "Globe", nombre: "Menú web" },
];

const SALE: Canal[] = [
  { icono: "ChefHat", nombre: "Cocina" },
  { icono: "Wallet", nombre: "Caja" },
  { icono: "Landmark", nombre: "Bancos" },
];

interface ListaProps {
  titulo: string;
  canales: Canal[];
}

/** Lista con punteado de ticket: icono y nombre, nunca solo color. */
const Lista = ({ titulo, canales }: ListaProps) => (
  <Stack gap={2}>
    <Text as="h3" textColor="color-on-surface" variant="title">
      {titulo}
    </Text>
    <Stack as="ul" gap={1}>
      {canales.map(({ icono, nombre }) => (
        <Cluster
          key={nombre}
          align="center"
          as="li"
          className="test-2-corto__row"
          gap={3}
          wrap={false}
        >
          <Icon
            aria-hidden
            className="test-2-corto__icon"
            name={icono}
            size={24}
          />
          <Text as="span" textColor="color-on-surface" variant="body">
            {nombre}
          </Text>
        </Cluster>
      ))}
    </Stack>
  </Stack>
);

/** Qué incluye: lo que entra y lo que sale del mismo cierre. Papel, no vidrio. */
const Incluye = () => (
  <Section className="test-2-corto__band" id="incluye">
    <Grid rowGap={10}>
      <Cell align="center" span={{ sm: 4, md: 6, lg: 5 }}>
        <Stack gap={4}>
          <Text as="h2" textColor="color-on-surface" variant="headline">
            Todo entra al mismo flujo
          </Text>
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Cada pedido, venga de donde venga, llega a la cocina y termina en el
            mismo cierre de caja y bancos.
          </Text>
        </Stack>
      </Cell>

      <Cell span={{ sm: 4, md: 6, lg: 6 }} start={{ lg: 7 }}>
        <AutoGrid gap={8} minItemWidth={220}>
          <Lista canales={ENTRA} titulo="Entra" />
          <Lista canales={SALE} titulo="Sale" />
        </AutoGrid>
      </Cell>
    </Grid>
  </Section>
);

export default Incluye;
