"use client";

import Image from "next/image";
import { Col, Container, Text } from "citrica-ui-toolkit";

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
  <section className="home__section" id="resultados">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <div className="home__stack">
          <Text as="h2" textColor="color-text-black" variant="headline">
            En 90 días, un restaurante con flujo constante
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            No prometemos virales. Prometemos un sistema que puedas auditar.
          </Text>

          <ul className="home__pains">
            {outcomes.map((outcome) => (
              <li key={outcome} className="home__pain">
                <Text
                  as="p"
                  className="home__measure"
                  textColor="color-text-black"
                  variant="body"
                >
                  {outcome}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <div className="home__media home__media--wide">
          <Image
            fill
            alt="Mesa de restaurante llena de platos servidos, vista desde arriba"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </Col>
    </Container>
  </section>
);

export default Resultados;
