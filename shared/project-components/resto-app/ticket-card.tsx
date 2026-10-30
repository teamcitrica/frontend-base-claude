"use client";

import type { ReactNode } from "react";

import { Card, Text } from "citrica-ui-toolkit";

import { Cluster, Stack } from "@/shared/components/layout";

interface TicketCardProps {
  title?: string;
  titleAs?: "h2" | "h3" | "p";
  /** Marca visible de contenido no real: "Muestra", "Ejemplo". */
  tag?: string;
  children: ReactNode;
}

/** Tarjeta de papel con forma de ticket: título, marca opcional y sus filas. */
export const TicketCard = ({
  title,
  titleAs = "h3",
  tag,
  children,
}: TicketCardProps) => (
  <Card className="c-ticket" radius="lg" shadow="none">
    <Stack gap={4}>
      {(title || tag) && (
        <Cluster align="center" gap={2} justify="between">
          {title && (
            <Text as={titleAs} textColor="color-on-surface" variant="title">
              {title}
            </Text>
          )}
          {tag && (
            <Text
              as="span"
              className="c-ticket__tag"
              textColor="color-on-surface-var"
              variant="label"
            >
              {tag}
            </Text>
          )}
        </Cluster>
      )}
      {children}
    </Stack>
  </Card>
);
