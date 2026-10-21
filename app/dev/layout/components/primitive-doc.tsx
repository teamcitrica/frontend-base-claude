"use client";

import { Icon, Text } from "citrica-ui-toolkit";

import type { PrimitiveDoc as Doc } from "../content";

import { Cluster, Stack } from "@/shared/components/layout";

/** Bloque de código. `Text` no trae variante de código: el gesto conserva saltos de línea. */
export const Snippet = ({ code }: { code: string }) => (
  <Text as="div" className="devlayout__code" textColor="color-text-black" variant="label">
    {code}
  </Text>
);

const Checklist = ({ items, kind }: { items: string[]; kind: "yes" | "no" }) => (
  <Stack as="ul" gap={2}>
    {items.map((item) => (
      <Cluster key={item} align="start" as="li" gap={2} wrap={false}>
        <span className="devlayout__mark">
          <Icon
            color={kind === "yes" ? "var(--color-primary)" : "var(--color-on-surface-var)"}
            name={kind === "yes" ? "Check" : "X"}
            size={18}
          />
        </span>
        <Text as="p" textColor="color-text-black" variant="body">
          {item}
        </Text>
      </Cluster>
    ))}
  </Stack>
);

/** Explicación de una primitiva: qué es, analogía, cuándo sí, cuándo no, props y snippet. */
export const PrimitiveDoc = ({ doc }: { doc: Doc }) => (
  <Stack gap={8}>
    <Stack gap={3}>
      <Text as="h2" textColor="color-text-black" variant="headline">
        {doc.name}
      </Text>
      <Text as="p" className="u-measure-prose" textColor="color-text-black" variant="subtitle">
        {doc.oneLiner}
      </Text>
      <Text as="p" className="u-measure-prose" textColor="color-on-surface-var" variant="body">
        {doc.analogy}
      </Text>
    </Stack>

    <Stack gap={3}>
      <Text as="h3" textColor="color-text-black" variant="label" weight="bold">
        Cuándo sí
      </Text>
      <Checklist items={doc.whenYes} kind="yes" />
    </Stack>

    <Stack gap={3}>
      <Text as="h3" textColor="color-text-black" variant="label" weight="bold">
        Cuándo no
      </Text>
      <Checklist items={doc.whenNo} kind="no" />
    </Stack>

    <Stack gap={3}>
      <Text as="h3" textColor="color-text-black" variant="label" weight="bold">
        Props
      </Text>
      <Stack as="ul" gap={1}>
        {doc.props.map((prop) => (
          <Cluster key={prop.name} as="li" className="devlayout__prop" gap={3}>
            <Text as="span" textColor="color-text-black" variant="label" weight="bold">
              {prop.name}
            </Text>
            <Text as="span" textColor="color-on-surface-var" variant="label">
              {prop.values}
            </Text>
          </Cluster>
        ))}
      </Stack>
    </Stack>

    <Snippet code={doc.snippet} />
  </Stack>
);
