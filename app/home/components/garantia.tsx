"use client";

import { Col, Container, Icon, Text } from "citrica-ui-toolkit";

import { Cluster, Section, Stack } from "@/shared/components/layout";

/**
 * Garantía. Baja el riesgo percibido justo antes del CTA.
 * Sección con aire: después del tramo denso, aquí se respira.
 */
const terms = [
  "90 días para ver el sistema funcionando.",
  "Si no hay flujo medible, seguimos trabajando sin costo hasta que lo haya.",
  "Los informes y los accesos son tuyos, te quedes o no.",
];

const Garantia = () => (
  <Section id="garantia" rhythm="airy">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8, lgPush: 2 }}>
        <Stack className="home__guarantee" gap={6}>
          <Text as="h2" textColor="color-text-black" variant="headline">
            90 días, sin letras pequeñas
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Te dieron promesas antes. Esta viene por escrito y con fecha.
          </Text>

          <Stack as="ul" gap={6}>
            {terms.map((term) => (
              <Cluster
                key={term}
                align="start"
                as="li"
                className="home__pain"
                gap={3}
                wrap={false}
              >
                <span className="home__pain-icon">
                  <Icon color="var(--color-primary)" name="Check" size={22} />
                </span>
                <Text
                  as="p"
                  className="u-measure-prose"
                  textColor="color-text-black"
                  variant="body"
                >
                  {term}
                </Text>
              </Cluster>
            ))}
          </Stack>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Garantia;
