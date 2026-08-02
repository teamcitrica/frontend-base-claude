"use client";

import { Col, Container, Icon, Text } from "citrica-ui-toolkit";

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
  <section className="home__section home__section--airy" id="garantia">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8, lgPush: 2 }}>
        <div className="home__guarantee">
          <Text as="h2" textColor="color-text-black" variant="headline">
            90 días, sin letras pequeñas
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Te dieron promesas antes. Esta viene por escrito y con fecha.
          </Text>

          <ul className="home__pains">
            {terms.map((term) => (
              <li key={term} className="home__pain">
                <span className="home__pain-icon">
                  <Icon color="var(--color-primary)" name="Check" size={22} />
                </span>
                <Text
                  as="p"
                  className="home__measure"
                  textColor="color-text-black"
                  variant="body"
                >
                  {term}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Container>
  </section>
);

export default Garantia;
