"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

/**
 * Tira de prueba social. Va inmediatamente después del hero porque el
 * visitante llega quemado por agencias y necesita un número antes de leer
 * un párrafo. Métricas sueltas, no cards: la rejilla de cards idénticas
 * restaría fuerza al número.
 */
const metrics = [
  { value: "+180%", label: "reservas en 3 meses" }, // ILUSTRATIVO
  { value: "90 días", label: "para ver flujo constante" }, // ILUSTRATIVO
  { value: "1 informe", label: "cada semana, sin adornos" }, // ILUSTRATIVO
];

const PruebaSocial = () => (
  <section className="home__section home__section--tight" id="prueba">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <ul className="home__metrics">
          {metrics.map((metric) => (
            <li key={metric.label} className="home__metric">
              <Text as="span" textColor="color-primary" variant="headline">
                {metric.value}
              </Text>
              <Text as="span" textColor="color-on-surface-var" variant="label">
                {metric.label}
              </Text>
            </li>
          ))}
        </ul>
      </Col>
    </Container>
  </section>
);

export default PruebaSocial;
