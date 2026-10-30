"use client";

import { Icon, Text, type IconName } from "citrica-ui-toolkit";

import { AutoGrid, Cluster, Stack } from "@/shared/components/layout";

interface AccountRowProps {
  label: string;
  value: string;
  /** Detalle bajo el concepto, en tamaño `label`. */
  note?: string;
  /** `minus`: se descuenta del total (prefijo −). */
  sign?: "minus";
}

/** Una línea de la cuenta: concepto a la izquierda, cifra alineada a la derecha. */
export const AccountRow = ({ label, value, note, sign }: AccountRowProps) => (
  <Cluster
    align="center"
    className="c-row"
    gap={4}
    justify="between"
    wrap={false}
  >
    <Stack gap={1}>
      <Text as="span" textColor="color-on-surface-var" variant="body">
        {label}
      </Text>
      {note && (
        <Text as="span" textColor="color-on-surface-var" variant="label">
          {note}
        </Text>
      )}
    </Stack>
    <Text
      as="span"
      className="c-figure"
      textColor="color-on-surface"
      variant="subtitle"
      weight="bold"
    >
      {sign === "minus" ? `− ${value}` : value}
    </Text>
  </Cluster>
);

interface CompareSide {
  /** Encabezado corto de la columna ("Hoy", "Con Resto App", "Rol"…). */
  label: string;
  title?: string;
  text: string;
}

interface CompareRowProps {
  start: CompareSide;
  end: CompareSide;
}

const Side = ({ side, muted }: { side: CompareSide; muted: boolean }) => (
  <Stack gap={1}>
    <Text as="span" textColor="color-on-surface-var" variant="label">
      {side.label}
    </Text>
    {side.title && (
      <Text
        as="span"
        textColor="color-on-surface"
        variant="subtitle"
        weight="bold"
      >
        {side.title}
      </Text>
    )}
    <Text
      as="p"
      textColor={muted ? "color-on-surface-var" : "color-on-surface"}
      variant="body"
    >
      {side.text}
    </Text>
  </Stack>
);

/**
 * Fila de dos columnas (antes / después, rol / control). En sm las columnas
 * se apilan solas (`AutoGrid`); cada lado lleva su encabezado.
 */
export const CompareRow = ({ start, end }: CompareRowProps) => (
  <AutoGrid className="c-row" gap={4} minItemWidth={220}>
    <Side muted side={start} />
    <Side muted={false} side={end} />
  </AutoGrid>
);

interface TotalBandProps {
  label: string;
  value?: string;
}

/** Cierre de la cuenta: banda arena con el total. */
export const TotalBand = ({ label, value }: TotalBandProps) => (
  <Cluster align="center" className="c-total" gap={4} justify="between">
    <Text as="span" textColor="color-on-tertiary" variant="title">
      {label}
    </Text>
    {value && (
      <Text
        as="span"
        className="c-figure"
        textColor="color-on-tertiary"
        variant="title"
      >
        {value}
      </Text>
    )}
  </Cluster>
);

interface ChannelTagProps {
  icon: IconName;
  label: string;
}

/** Un canal de venta: icono y nombre. */
export const ChannelTag = ({ icon, label }: ChannelTagProps) => (
  <Cluster align="center" gap={2} wrap={false}>
    <Icon aria-hidden className="c-icon" name={icon} />
    <Text as="span" textColor="color-on-surface" variant="body" weight="bold">
      {label}
    </Text>
  </Cluster>
);
