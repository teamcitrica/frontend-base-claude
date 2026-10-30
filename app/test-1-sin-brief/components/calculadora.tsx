"use client";

import { useState } from "react";
import { Card, Input, Text } from "citrica-ui-toolkit";
import clsx from "clsx";

import {
  COMISION_REFERENCIA,
  COSTO_FIJO_USD,
  VENTAS_MUESTRA,
  calcularCuenta,
  formatUSD,
  leerVentas,
  porcentaje,
  umbralConveniencia,
} from "./cuenta";

import { Cluster, Stack } from "@/shared/components/layout";

interface FilaProps {
  concepto: string;
  monto: string;
}

/** Una línea del ticket: concepto a la izquierda, cifra alineada a la derecha. */
const Fila = ({ concepto, monto }: FilaProps) => (
  <Cluster
    align="center"
    className="test-1-sin-brief__ticket-row"
    gap={4}
    justify="between"
    wrap={false}
  >
    <Text as="span" textColor="color-on-surface-var" variant="body">
      {concepto}
    </Text>
    <Text
      as="span"
      className="test-1-sin-brief__figure"
      textColor="color-on-surface"
      variant="subtitle"
      weight="bold"
    >
      {monto}
    </Text>
  </Cluster>
);

/**
 * La cuenta de la comisión: la dueña escribe sus ventas del mes y ve, en
 * formato ticket, cuánto se le iría en comisiones frente al costo fijo.
 * Con ventas bajas la comisión sale más barata y se dice tal cual
 * (decisión del usuario en shape, SPEC-0005).
 */
const Calculadora = () => {
  const [digitos, setDigitos] = useState(String(VENTAS_MUESTRA));
  const { valor } = leerVentas(digitos);
  const cuenta = calcularCuenta(valor);

  return (
    <Card className="test-1-sin-brief__ticket" radius="lg" shadow="none">
      <Stack gap={6}>
        <Input
          description="Escribe cuánto vende tu local en un mes."
          label="Ventas del mes"
          maxLength={9}
          pattern="[0-9]*"
          startContent={
            <Text as="span" textColor="color-on-surface-var" variant="body">
              USD
            </Text>
          }
          type="text"
          value={digitos}
          variant="primary"
          onValueChange={(crudo) => setDigitos(leerVentas(crudo).digitos)}
        />

        <Stack aria-live="polite" gap={4}>
          <Stack gap={1}>
            <Fila
              concepto={`Comisión por venta (${porcentaje(COMISION_REFERENCIA)})`}
              monto={formatUSD(cuenta.comision)}
            />
            <Fila
              concepto="Resto App, costo fijo al mes"
              monto={formatUSD(cuenta.costoFijo)}
            />
          </Stack>

          <Stack
            className={clsx(
              "test-1-sin-brief__total",
              !cuenta.convieneRestoApp && "test-1-sin-brief__total--neutral",
            )}
            gap={1}
          >
            {cuenta.convieneRestoApp ? (
              <Cluster align="center" gap={4} justify="between">
                <Text as="span" textColor="color-on-tertiary" variant="title">
                  Te quedas al mes
                </Text>
                <Text
                  as="span"
                  className="test-1-sin-brief__figure"
                  textColor="color-on-tertiary"
                  variant="title"
                >
                  {formatUSD(cuenta.diferencia)}
                </Text>
              </Cluster>
            ) : (
              <>
                <Text as="p" textColor="color-on-surface" variant="title">
                  Con este volumen, la comisión te sale más barata
                </Text>
                <Text as="p" textColor="color-on-surface-var" variant="body">
                  Resto App conviene desde {formatUSD(umbralConveniencia())} en
                  ventas al mes.
                </Text>
              </>
            )}
          </Stack>
        </Stack>

        <Text as="p" textColor="color-on-surface-var" variant="label">
          Valores de referencia: {porcentaje(COMISION_REFERENCIA)} de comisión
          por venta y {formatUSD(COSTO_FIJO_USD)} al mes de costo fijo.
        </Text>
      </Stack>
    </Card>
  );
};

export default Calculadora;
