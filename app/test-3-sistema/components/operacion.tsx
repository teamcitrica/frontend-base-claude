"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { AutoGrid, Section, Stack } from "@/shared/components/layout";
import { ModuleCard } from "@/shared/project-components/resto-app";

/** Operación en vivo: los tres módulos del turno abierto (brief, sección 4). */
const Operacion = () => (
  <Section id="operacion">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Stack gap={8}>
          <Stack gap={4}>
            <Text as="h2" textColor="color-on-surface" variant="headline">
              Durante el turno abierto
            </Text>
            <Text
              as="p"
              className="u-measure-narrow"
              textColor="color-on-surface-var"
              variant="subtitle"
            >
              La cocina recibe el pedido antes de que el mesero dé la vuelta.
            </Text>
          </Stack>
          <AutoGrid gap={6} minItemWidth={240}>
            <ModuleCard icon="Tablet" title="Comandero móvil">
              El mesero toma el pedido en la mesa desde su tablet; la cocina ve
              la orden al instante mientras el sistema sugiere los platos del
              día.
            </ModuleCard>
            <ModuleCard icon="ChefHat" title="Monitor de cocina (KDS)">
              Reemplaza el boleto de papel. Cada comanda llega con su estación y
              un cronómetro que avisa de las demoras antes de que el cliente
              reclame en sala.
            </ModuleCard>
            <ModuleCard icon="LayoutGrid" title="Layout real del local">
              Mesas, barra y aforo dibujados igual que la distribución física de
              tu local.
            </ModuleCard>
          </AutoGrid>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Operacion;
