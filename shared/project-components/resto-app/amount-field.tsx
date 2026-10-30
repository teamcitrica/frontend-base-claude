"use client";

import { Input, Text } from "citrica-ui-toolkit";

import { leerDigitos } from "./cuenta";

interface AmountFieldProps {
  label: string;
  description?: string;
  /** Solo dígitos (controlado). */
  value: string;
  onValueChange: (digitos: string) => void;
  maxDigits: number;
  /** Unidad antes de la cifra (`USD`). */
  prefix?: string;
  /** Unidad después de la cifra (`%`). */
  suffix?: string;
}

const Unidad = ({ children }: { children: string }) => (
  <Text as="span" textColor="color-on-surface-var" variant="body">
    {children}
  </Text>
);

/**
 * Campo de cifra: solo dígitos hasta `maxDigits`, con su unidad. Hereda del
 * `Input` del toolkit los 56px, el texto de 16px y el foco coral.
 */
export const AmountField = ({
  label,
  description,
  value,
  onValueChange,
  maxDigits,
  prefix,
  suffix,
}: AmountFieldProps) => (
  <Input
    description={description}
    endContent={suffix ? <Unidad>{suffix}</Unidad> : undefined}
    label={label}
    maxLength={maxDigits}
    pattern="[0-9]*"
    startContent={prefix ? <Unidad>{prefix}</Unidad> : undefined}
    type="text"
    value={value}
    variant="primary"
    onValueChange={(crudo) =>
      onValueChange(leerDigitos(crudo, maxDigits).digitos)
    }
  />
);
