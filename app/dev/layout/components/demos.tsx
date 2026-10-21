"use client";

import type { ReactNode } from "react";
import type { Column, Space } from "@/shared/components/layout";

import { Col, Container, Icon, Text } from "citrica-ui-toolkit";

import {
  AutoGrid,
  Cell,
  Cluster,
  Grid,
  Media,
  Section,
  Stack,
} from "@/shared/components/layout";

// Cajas de muestra. Son el único <div> propio de la página: un gesto de
// documentación (`devlayout__box`), no layout.
const Box = ({
  children,
  tone = "plain",
}: {
  children: ReactNode;
  tone?: "plain" | "accent" | "media";
}) => (
  <div className={`devlayout__box devlayout__box--${tone}`}>
    <Text
      as="span"
      textColor={tone === "media" ? "color-text-white" : "color-text-black"}
      variant="label"
    >
      {children}
    </Text>
  </div>
);

// Relleno de un Media: ocupa el marco como lo haría una imagen.
const MediaFill = ({ label }: { label: string }) => (
  <div className="devlayout__fill">
    <Text as="span" textColor="color-text-white" variant="label">
      {label}
    </Text>
  </div>
);

const Caption = ({ children }: { children: ReactNode }) => (
  <Text as="p" textColor="color-on-surface-var" variant="label">
    {children}
  </Text>
);

export const SectionDemo = () => (
  <Stack gap={3}>
    <Section as="div" className="devlayout__band" rhythm="tight">
      <Caption>
        rhythm=&quot;tight&quot; · tone=&quot;base&quot; — 40px arriba y abajo
      </Caption>
    </Section>
    <Section as="div" className="devlayout__band" tone="surface">
      <Caption>
        rhythm=&quot;default&quot; · tone=&quot;surface&quot; — 64px
      </Caption>
    </Section>
    <Section as="div" className="devlayout__band" rhythm="airy" tone="inverse">
      <Text as="p" textColor="color-text-white" variant="label">
        rhythm=&quot;airy&quot; · tone=&quot;inverse&quot; — 96px, un solo
        carbón por página
      </Text>
    </Section>
  </Stack>
);

const STACK_GAPS: Space[] = [2, 6, 10];

export const StackDemo = () => (
  <Cluster align="start" gap={8}>
    {STACK_GAPS.map((gap) => (
      <Stack key={gap} gap={3}>
        <Caption>
          gap={`{${gap}}`} · {gap * 4}px
        </Caption>
        <Stack gap={gap}>
          <Box>uno</Box>
          <Box>dos</Box>
          <Box>tres</Box>
        </Stack>
      </Stack>
    ))}
  </Cluster>
);

const WORDS = [
  "Reservas",
  "Pauta",
  "Ficha",
  "Reseñas",
  "Carta",
  "Redes",
  "Informe semanal",
  "WhatsApp",
  "Diagnóstico",
];

export const ClusterDemo = () => (
  <Stack gap={8}>
    <Stack gap={3}>
      <Caption>gap={"{3}"} — salta de línea cuando no cabe</Caption>
      <Cluster gap={3}>
        {WORDS.map((word) => (
          <Box key={word}>{word}</Box>
        ))}
      </Cluster>
    </Stack>
    <Stack gap={3}>
      <Caption>justify=&quot;between&quot; — a los extremos</Caption>
      <Cluster gap={3} justify="between">
        <Box>firma</Box>
        <Box>créditos</Box>
      </Cluster>
    </Stack>
    <Stack gap={3}>
      <Caption>
        wrap={"{false}"} · align=&quot;start&quot; — icono y texto en una línea
      </Caption>
      <Cluster align="start" gap={3} wrap={false}>
        <span className="devlayout__mark">
          <Icon color="var(--color-primary)" name="Clock" size={20} />
        </span>
        <Text as="p" textColor="color-text-black" variant="body">
          El texto se parte en varias líneas, pero nunca baja debajo del icono.
        </Text>
      </Cluster>
    </Stack>
  </Stack>
);

export const MediaDemo = () => (
  <AutoGrid gap={6} minItemWidth={220}>
    <Stack gap={3}>
      <Media ratio="16/10">
        <MediaFill label="ratio 16/10" />
      </Media>
      <Caption>Fotos anchas: resultados, ambientes.</Caption>
    </Stack>
    <Stack gap={3}>
      <Media ratio="4/3">
        <MediaFill label="ratio 4/3" />
      </Media>
      <Caption>Fotos más altas: platos, personas.</Caption>
    </Stack>
  </AutoGrid>
);

export const AutoGridDemo = () => (
  <Stack gap={3}>
    <Caption>
      minItemWidth={"{240}"} · gap={"{6}"} — cambia el ancho de la ventana
    </Caption>
    <AutoGrid gap={6} minItemWidth={240}>
      {[
        "Diagnóstico",
        "Posicionamiento",
        "Adquisición",
        "Optimización",
        "Informe",
      ].map((step) => (
        <Box key={step}>{step}</Box>
      ))}
    </AutoGrid>
  </Stack>
);

const COLUMNS: Column[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/** Guía de columnas: muestra las columnas del breakpoint actual (4, 6 o 12). */
export const ColumnGuide = () => (
  <Grid>
    {COLUMNS.map((n) => (
      <Cell
        key={n}
        className={
          n > 6
            ? "devlayout__guide-lg"
            : n > 4
              ? "devlayout__guide-md"
              : undefined
        }
        row={1}
        span={1}
        start={n}
      >
        <Box tone="accent">{n}</Box>
      </Cell>
    ))}
  </Grid>
);

/** Col y Cell con el mismo ancho, uno encima del otro. AC-5 mide estas dos cajas. */
export const ColVsCell = () => (
  <Stack gap={3}>
    <Container>
      <Col cols={{ sm: 4, md: 4, lg: 8 }}>
        <div className="devlayout__box devlayout__box--plain" data-probe="col">
          <Text as="span" textColor="color-text-black" variant="label">
            Col · sm 4 · md 4 · lg 8
          </Text>
        </div>
      </Col>
    </Container>
    <Grid>
      <Cell span={{ sm: 4, md: 4, lg: 8 }}>
        <div
          className="devlayout__box devlayout__box--accent"
          data-probe="cell"
        >
          <Text as="span" textColor="color-text-black" variant="label">
            Cell · span sm 4 · md 4 · lg 8
          </Text>
        </div>
      </Cell>
    </Grid>
  </Stack>
);

export const BleedDemo = () => (
  <Grid className="devlayout__stage">
    <Cell breakout="full" className="devlayout__stage-media" row={1}>
      <MediaFill label='foto a sangre · breakout="full"' />
    </Cell>
    <Cell
      align="end"
      className="devlayout__stage-content"
      row={1}
      span={{ lg: 6 }}
    >
      <Stack gap={3}>
        <Text as="p" textColor="color-text-white" variant="headline">
          El texto vive en la retícula
        </Text>
        <Text as="p" textColor="color-text-white" variant="body">
          Misma fila que la foto: se superponen sin position: absolute.
        </Text>
      </Stack>
    </Cell>
  </Grid>
);

export const AsymmetryDemo = () => (
  <Grid rowGap={6}>
    <Cell row={1} span={{ lg: 7 }}>
      <Box tone="accent">titular · columnas 1–7</Box>
    </Cell>
    <Cell row={2} span={{ lg: 5 }} start={{ lg: 8 }}>
      <Box>texto · columnas 8–12, una fila abajo</Box>
    </Cell>
    <Cell row={3} span={{ lg: 4 }} start={{ lg: 3 }}>
      <Box>dato · columnas 3–6</Box>
    </Cell>
  </Grid>
);

export const OverlapDemo = () => (
  <Grid rowGap={6}>
    <Cell row={1} span={{ lg: 7 }}>
      <Media ratio="4/3">
        <MediaFill label="imagen · columnas 1–7" />
      </Media>
    </Cell>
    <Cell
      align="center"
      className="devlayout__lift"
      row={{ sm: 2, lg: 1 }}
      span={{ lg: 7 }}
      start={{ lg: 6 }}
    >
      <Stack className="devlayout__card" gap={3}>
        <Text as="p" textColor="color-text-black" variant="title">
          Texto · columnas 6–12
        </Text>
        <Text as="p" textColor="color-on-surface-var" variant="body">
          Comparte las columnas 6 y 7 con la imagen y queda encima por orden del
          DOM.
        </Text>
      </Stack>
    </Cell>
  </Grid>
);

export const WideDemo = () => (
  <Grid rowGap={6}>
    <Cell align="center" row={1} span={{ lg: 5 }}>
      <Stack gap={3}>
        <Text as="p" textColor="color-text-black" variant="title">
          El texto se queda en la retícula
        </Text>
        <Text as="p" textColor="color-on-surface-var" variant="body">
          La imagen empieza en la columna 7 y llega al borde derecho de la
          pantalla.
        </Text>
      </Stack>
    </Cell>
    <Cell breakout="wide-end" row={{ sm: 2, lg: 1 }} start={{ lg: 7 }}>
      <Media radius="none" ratio="16/10">
        <MediaFill label='breakout="wide-end"' />
      </Media>
    </Cell>
  </Grid>
);
