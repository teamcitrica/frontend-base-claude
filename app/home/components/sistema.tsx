"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

/**
 * "No es falta de esfuerzo. Es falta de sistema."
 * Quita la culpa antes de proponer nada. Sección corta y densa.
 */
const Sistema = () => (
  <section className="home__section home__section--tight" id="sistema">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 10, lgPush: 1 }}>
        <div className="home__stack">
          <Text as="h2" textColor="color-text-black" variant="headline">
            No es falta de esfuerzo. Es falta de sistema.
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Has probado agencias, freelancers y sobrinos con buena cámara. Cada
            uno hizo su parte suelta: una sesión de fotos aquí, unas pautas
            allá, un mes de historias. Nada de eso se mide contra lo único que
            importa, que es cuánta gente se sentó a comer.
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="body"
          >
            Sin un sistema que conecte lo que publicas con lo que se reserva,
            cada mes vuelves a empezar de cero y a decidir por corazonada.
          </Text>
        </div>
      </Col>
    </Container>
  </section>
);

export default Sistema;
