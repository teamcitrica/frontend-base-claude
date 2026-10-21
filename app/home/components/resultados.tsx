"use client";

import Image from "next/image";
import { Col, Container, Text } from "citrica-ui-toolkit";

import { Cluster, Media, Section, Stack } from "@/shared/components/layout";

/**
 * Qué vas a conseguir. Es la sección que el nav llama "Resultados".
 * La foto es el resultado, literal: la mesa llena.
 */
const outcomes = [
  "Un calendario de reservas que no depende del boca a boca.",
  "Un informe semanal que puedes leer en cinco minutos.",
  "Saber, por primera vez, cuánto cuesta traer a un comensal nuevo.",
];

const Resultados = () => (
  <Section id="resultados">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-black" variant="headline">
            En 90 días, un restaurante con flujo constante
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            No prometemos virales. Prometemos un sistema que puedas auditar.
          </Text>

          <Stack as="ul" gap={6}>
            {outcomes.map((outcome) => (
              <Cluster
                key={outcome}
                align="start"
                as="li"
                className="home__pain"
                gap={3}
                wrap={false}
              >
                <Text
                  as="p"
                  className="u-measure-prose"
                  textColor="color-text-black"
                  variant="body"
                >
                  {outcome}
                </Text>
              </Cluster>
            ))}
          </Stack>
        </Stack>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <Media ratio="16/10">
          <Image
            fill
            alt="Mesa de restaurante llena de platos servidos, vista desde arriba"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
          />
        </Media>
      </Col>
    </Container>
  </Section>
);

export default Resultados;
