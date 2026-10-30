"use client";

import { Col, Container, Text, type IconName } from "citrica-ui-toolkit";

import { AutoGrid, Section, Stack } from "@/shared/components/layout";
import { ChannelTag, TicketCard } from "@/shared/project-components/resto-app";

const CANALES: { icono: IconName; nombre: string }[] = [
  { icono: "Utensils", nombre: "Salón" },
  { icono: "Store", nombre: "Mostrador" },
  { icono: "Bike", nombre: "Delivery propio" },
  { icono: "Globe", nombre: "Menú web" },
];

/** Cinta de canales: para qué locales es y por dónde entra el pedido. */
const Canales = () => (
  <Section rhythm="tight">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-on-surface" variant="title">
            Diseñado para el ritmo real de restaurantes, dark kitchens, bares y
            cafeterías.
          </Text>
          <TicketCard>
            <AutoGrid gap={4} minItemWidth={220}>
              {CANALES.map(({ icono, nombre }) => (
                <ChannelTag key={nombre} icon={icono} label={nombre} />
              ))}
            </AutoGrid>
          </TicketCard>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Canales;
