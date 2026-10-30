"use client";

import Image from "next/image";
import { Icon, Text, type IconName } from "citrica-ui-toolkit";

import {
  AutoGrid,
  Cell,
  Cluster,
  Grid,
  Media,
  Section,
  Stack,
} from "@/shared/components/layout";

interface Canal {
  icono: IconName;
  nombre: string;
  detalle: string;
}

const ENTRA: Canal[] = [
  { icono: "Utensils", nombre: "Salón", detalle: "Pedidos en mesa" },
  { icono: "Store", nombre: "Mostrador", detalle: "Venta al paso" },
  {
    icono: "Bike",
    nombre: "Delivery propio",
    detalle: "Tus pedidos a domicilio",
  },
  {
    icono: "Globe",
    nombre: "Menú web",
    detalle: "Pedidos desde tu menú en línea",
  },
];

const SALE: Canal[] = [
  { icono: "ChefHat", nombre: "Cocina", detalle: "Recibe cada pedido" },
  { icono: "Wallet", nombre: "Caja", detalle: "Cuadra el turno" },
  { icono: "Landmark", nombre: "Bancos", detalle: "Entran en el mismo cierre" },
];

interface ColumnaProps {
  titulo: string;
  canales: Canal[];
}

/** Lista con punteado de ticket: icono, nombre y detalle; nunca solo color. */
const Columna = ({ titulo, canales }: ColumnaProps) => (
  <Stack gap={2}>
    <Text as="h3" textColor="color-on-surface" variant="title">
      {titulo}
    </Text>
    <Stack as="ul" gap={1}>
      {canales.map(({ icono, nombre, detalle }) => (
        <Cluster
          key={nombre}
          align="center"
          as="li"
          className="test-1-sin-brief__flow-row"
          gap={3}
          wrap={false}
        >
          <Icon
            aria-hidden
            className="test-1-sin-brief__flow-icon"
            name={icono}
            size={24}
          />
          <Stack gap={1}>
            <Text
              as="span"
              textColor="color-on-surface"
              variant="body"
              weight="bold"
            >
              {nombre}
            </Text>
            <Text as="span" textColor="color-on-surface-var" variant="body">
              {detalle}
            </Text>
          </Stack>
        </Cluster>
      ))}
    </Stack>
  </Stack>
);

/**
 * Entra → sale. La foto es de stock y DE MUESTRA (Unsplash, verificada con
 * `curl -I`: 200 image/jpeg) hasta que el cliente mande una de su local.
 */
const Flujo = () => (
  <Section className="test-1-sin-brief__band" id="flujo">
    <Grid rowGap={10}>
      <Cell align="center" span={{ sm: 4, md: 6, lg: 5 }}>
        <Media ratio="4/3">
          <Image
            fill
            alt="Barista registrando un pedido en una tablet sobre el mostrador de una cafetería"
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
            src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=1200&q=80"
          />
        </Media>
      </Cell>

      <Cell span={{ sm: 4, md: 6, lg: 6 }} start={{ lg: 7 }}>
        <Stack gap={8}>
          <Text as="h2" textColor="color-on-surface" variant="headline">
            Todo entra al mismo flujo. Todo sale del mismo cierre.
          </Text>
          <AutoGrid gap={8} minItemWidth={220}>
            <Columna canales={ENTRA} titulo="Entra" />
            <Columna canales={SALE} titulo="Sale" />
          </AutoGrid>
        </Stack>
      </Cell>
    </Grid>
  </Section>
);

export default Flujo;
