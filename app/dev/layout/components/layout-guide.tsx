"use client";

import type { ReactNode } from "react";

import { Text } from "citrica-ui-toolkit";

import { decisions, gestures, intro, primitives } from "../content";

import {
  AsymmetryDemo,
  AutoGridDemo,
  BleedDemo,
  ClusterDemo,
  ColumnGuide,
  ColVsCell,
  MediaDemo,
  OverlapDemo,
  SectionDemo,
  StackDemo,
  WideDemo,
} from "./demos";
import { PrimitiveDoc, Snippet } from "./primitive-doc";

import {
  Cell,
  Cluster,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";

// Client Component porque citrica-ui-toolkit no declara "use client" y su
// barrel importa HeroUI: no es seguro dentro de un Server Component.

const DEMOS: Record<string, () => JSX.Element> = {
  section: SectionDemo,
  stack: StackDemo,
  cluster: ClusterDemo,
  media: MediaDemo,
  autogrid: AutoGridDemo,
};

/** Explicación a la izquierda, demo a la derecha en lg; apilado en sm y md. */
const PrimitiveSection = ({ id }: { id: string }) => {
  const doc = primitives.find((p) => p.id === id)!;
  const Demo = DEMOS[id];

  return (
    <Section className="devlayout__section" id={id}>
      <Grid rowGap={10}>
        <Cell span={{ lg: 5 }}>
          <PrimitiveDoc doc={doc} />
        </Cell>
        <Cell align="start" span={{ lg: 6 }} start={{ lg: 7 }}>
          <Stack gap={3}>
            <Text
              as="p"
              textColor="color-on-surface-var"
              variant="label"
              weight="bold"
            >
              En vivo
            </Text>
            <div className="devlayout__frame">
              <Demo />
            </div>
          </Stack>
        </Cell>
      </Grid>
    </Section>
  );
};

/** Cada gesto de Grid: explicación en la retícula y demo a ancho completo. */
const Gesture = ({
  gesture,
  children,
}: {
  gesture: (typeof gestures)[keyof typeof gestures];
  children: ReactNode;
}) => (
  <Stack gap={6}>
    <Grid rowGap={4}>
      <Cell span={{ lg: 6 }}>
        <Stack gap={3}>
          <Text as="h3" textColor="color-text-black" variant="title">
            {gesture.title}
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-text-black"
            variant="body"
          >
            {gesture.body}
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="label"
          >
            {gesture.mobile}
          </Text>
        </Stack>
      </Cell>
      <Cell span={{ lg: 6 }} start={{ lg: 7 }}>
        <Snippet code={gesture.snippet} />
      </Cell>
    </Grid>
    {children}
  </Stack>
);

const LayoutGuide = () => {
  const grid = primitives.find((p) => p.id === "grid")!;

  return (
    <main className="devlayout">
      <Section rhythm="airy">
        <Grid>
          <Cell span={{ lg: 8 }}>
            <Stack gap={6}>
              <Text as="h1" textColor="color-text-black" variant="display">
                {intro.title}
              </Text>
              <Text
                as="p"
                className="u-measure-prose"
                textColor="color-text-black"
                variant="subtitle"
              >
                {intro.lead}
              </Text>
              <Text
                as="p"
                className="u-measure-prose"
                textColor="color-text-black"
                variant="body"
              >
                {intro.rule}
              </Text>
              <Text
                as="p"
                className="u-measure-prose"
                textColor="color-on-surface-var"
                variant="label"
              >
                {intro.source}
              </Text>
            </Stack>
          </Cell>
        </Grid>
      </Section>

      <Section id="que-uso" rhythm="tight" tone="surface">
        <Grid rowGap={6}>
          <Cell span={{ lg: 8 }}>
            <Text as="h2" textColor="color-text-black" variant="headline">
              ¿Qué uso?
            </Text>
          </Cell>
          <Cell span={{ lg: 8 }}>
            {/* Lista en flujo normal: las filas se separan con su regla, no con gap. */}
            <ul>
              {decisions.map((d) => (
                <Cluster
                  key={d.need}
                  align="center"
                  as="li"
                  className="devlayout__row"
                  gap={4}
                  justify="between"
                >
                  <Text as="span" textColor="color-text-black" variant="body">
                    {d.need}
                  </Text>
                  <Text
                    as="a"
                    href={d.href}
                    textColor="color-text-black"
                    textDecoration="underline"
                    variant="label"
                    weight="bold"
                  >
                    {d.use}
                  </Text>
                </Cluster>
              ))}
            </ul>
          </Cell>
        </Grid>
      </Section>

      {["section", "stack", "cluster", "media", "autogrid"].map((id) => (
        <PrimitiveSection key={id} id={id} />
      ))}

      <Section className="devlayout__section" id="grid" rhythm="airy">
        <Stack gap={16}>
          <Grid rowGap={10}>
            <Cell span={{ lg: 5 }}>
              <PrimitiveDoc doc={grid} />
            </Cell>
            <Cell align="start" span={{ lg: 6 }} start={{ lg: 7 }}>
              <Stack gap={3}>
                <Text
                  as="p"
                  textColor="color-text-black"
                  variant="label"
                  weight="bold"
                >
                  Un Grid se alinea con la retícula solo si su padre ocupa todo
                  el ancho
                </Text>
                <Text
                  as="p"
                  className="u-measure-prose"
                  textColor="color-on-surface-var"
                  variant="body"
                >
                  Calcula sus márgenes laterales a partir del padding del
                  Container. Ponlo como hijo directo de una Section (o de un
                  Stack a ancho completo), nunca dentro de una Cell o de un Col:
                  ahí quedaría desplazado.
                </Text>
              </Stack>
            </Cell>
          </Grid>

          <Stack gap={4}>
            <Grid>
              <Cell>
                <Text as="h3" textColor="color-text-black" variant="title">
                  Las columnas
                </Text>
              </Cell>
            </Grid>
            <ColumnGuide />
            <Grid>
              <Cell>
                <Text as="p" textColor="color-on-surface-var" variant="label">
                  12 en escritorio, 6 en tablet, 4 en móvil. Mismo gutter y
                  mismos márgenes que Container.
                </Text>
              </Cell>
            </Grid>
          </Stack>

          <Stack gap={4}>
            <Grid>
              <Cell>
                <Text as="h3" textColor="color-text-black" variant="title">
                  Col y Cell miden lo mismo
                </Text>
              </Cell>
            </Grid>
            <ColVsCell />
          </Stack>

          <Gesture gesture={gestures.bleed}>
            <BleedDemo />
          </Gesture>
          <Gesture gesture={gestures.asymmetry}>
            <AsymmetryDemo />
          </Gesture>
          <Gesture gesture={gestures.overlap}>
            <OverlapDemo />
          </Gesture>
          <Gesture gesture={gestures.wide}>
            <WideDemo />
          </Gesture>

          <Grid>
            <Cell>
              <Text
                as="a"
                href="/#hero"
                textColor="color-text-black"
                textDecoration="underline"
                variant="label"
                weight="bold"
              >
                Ver el gesto con una foto real: el hero de la landing
              </Text>
            </Cell>
          </Grid>
        </Stack>
      </Section>
    </main>
  );
};

export default LayoutGuide;
