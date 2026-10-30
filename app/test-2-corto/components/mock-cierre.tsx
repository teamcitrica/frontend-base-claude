"use client";

import { Icon, Text, type IconName } from "citrica-ui-toolkit";

import { Cluster, Stack } from "@/shared/components/layout";

// Datos DE MUESTRA: no hay capturas reales de la app (SPEC-0006, AC-5).
const CIERRE = [
  { canal: "Salón", monto: "USD 640" },
  { canal: "Mostrador", monto: "USD 310" },
  { canal: "Delivery", monto: "USD 280" },
  { canal: "Menú web", monto: "USD 170" },
];

const PEDIDOS: { icono: IconName; texto: string }[] = [
  { icono: "Utensils", texto: "Mesa 4" },
  { icono: "Bike", texto: "Delivery 12" },
  { icono: "Globe", texto: "Menú web" },
];

/** Teléfono grande: el cierre del día, con los canales y un total. */
export const MockCierre = () => (
  <Stack className="test-2-corto__glass test-2-corto__phone" gap={2}>
    <Text as="span" textColor="color-text-white" variant="label">
      Cierre de hoy
    </Text>
    <Stack gap={1}>
      {CIERRE.map(({ canal, monto }) => (
        <Cluster
          key={canal}
          align="center"
          className="test-2-corto__mock-row"
          gap={2}
          justify="between"
          wrap={false}
        >
          <Text as="span" textColor="color-text-white" variant="label">
            {canal}
          </Text>
          <Text
            as="span"
            className="test-2-corto__figure"
            textColor="color-text-white"
            variant="label"
          >
            {monto}
          </Text>
        </Cluster>
      ))}
    </Stack>
    <Cluster
      align="center"
      className="test-2-corto__mock-total"
      gap={2}
      justify="between"
      wrap={false}
    >
      <Text
        as="span"
        textColor="color-text-white"
        variant="label"
        weight="bold"
      >
        Total
      </Text>
      <Text
        as="span"
        className="test-2-corto__figure"
        textColor="color-text-white"
        variant="label"
        weight="bold"
      >
        USD 1.400
      </Text>
    </Cluster>
  </Stack>
);

/** Teléfono pequeño: pedidos entrando desde varios canales. */
export const MockPedidos = () => (
  <Stack className="test-2-corto__glass test-2-corto__phone" gap={2}>
    <Text as="span" textColor="color-text-white" variant="label">
      Pedidos
    </Text>
    <Stack gap={1}>
      {PEDIDOS.map(({ icono, texto }) => (
        <Cluster
          key={texto}
          align="center"
          className="test-2-corto__mock-row"
          gap={2}
          wrap={false}
        >
          <Icon
            aria-hidden
            className="test-2-corto__mock-icon"
            name={icono}
            size={16}
          />
          <Text as="span" textColor="color-text-white" variant="label">
            {texto}
          </Text>
        </Cluster>
      ))}
    </Stack>
  </Stack>
);
