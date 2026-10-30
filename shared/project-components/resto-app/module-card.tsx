"use client";

import type { ReactNode } from "react";

import { Card, Icon, Text, type IconName } from "citrica-ui-toolkit";

import { Stack } from "@/shared/components/layout";

interface ModuleCardProps {
  icon: IconName;
  title: string;
  titleAs?: "h3" | "h4";
  children: ReactNode;
}

/** Un módulo del sistema: icono, nombre y qué resuelve en el turno. */
export const ModuleCard = ({
  icon,
  title,
  titleAs = "h3",
  children,
}: ModuleCardProps) => (
  <Card className="c-module" radius="lg" shadow="none">
    <Stack gap={3}>
      <Icon aria-hidden className="c-icon" name={icon} />
      <Text as={titleAs} textColor="color-on-surface" variant="title">
        {title}
      </Text>
      <Text as="p" textColor="color-on-surface-var" variant="body">
        {children}
      </Text>
    </Stack>
  </Card>
);
