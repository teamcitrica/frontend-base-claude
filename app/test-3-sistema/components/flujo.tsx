"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Section, Stack } from "@/shared/components/layout";
import { CompareRow, TicketCard } from "@/shared/project-components/resto-app";

// Matriz del brief, sección 3.
const FILAS = [
  {
    hoy: "Pedidos dispersos en tres programas incompatibles, con versiones contradictorias.",
    conResto:
      "Entrada unificada: salón, mostrador, delivery propio y menú web en un solo sistema.",
  },
  {
    hoy: "Meseros caminando a la caja para cargar comandas, o anotando en planillas a mano.",
    conResto:
      "Comandero móvil en tablet: la cocina recibe la orden en el mismo segundo.",
  },
  {
    hoy: "Cuadre de caja a mano, con diferencias al cierre entre efectivo, puntos y divisas.",
    conResto:
      "Caja y arqueo automático multi-divisa, con el ticket promedio del día al instante.",
  },
  {
    hoy: "Márgenes mermados por comisiones por venta y por descuentos libres.",
    conResto:
      "Monto fijo mensual sin comisiones y permisos por rol (Super Admin, Admin, Cajero, Mesero).",
  },
];

/** Caos multiprograma frente a un solo flujo, en filas de cuenta. */
const Flujo = () => (
  <Section id="flujo">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 10 }}>
        <Stack gap={8}>
          <Stack gap={4}>
            <Text as="h2" textColor="color-on-surface" variant="headline">
              Del caos de tres programas a un solo flujo
            </Text>
            <Text
              as="p"
              className="u-measure-narrow"
              textColor="color-on-surface-var"
              variant="subtitle"
            >
              La cocina prepara, la caja cobra y la tesorería registra, sin
              duplicar planillas ni conciliar entre sistemas.
            </Text>
          </Stack>
          <TicketCard>
            <Stack gap={1}>
              {FILAS.map(({ hoy, conResto }) => (
                <CompareRow
                  key={hoy}
                  end={{ label: "Con Resto App", text: conResto }}
                  start={{ label: "Hoy", text: hoy }}
                />
              ))}
            </Stack>
          </TicketCard>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Flujo;
