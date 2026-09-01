"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

/**
 * "El marketing no es presencia. Es flujo de comensales."
 * Entrada al método: reencuadra qué se está comprando.
 */
const Solucion = () => (
  <section className="home__section home__section--surface" id="solucion">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 7 }}>
        <div className="home__stack">
          <Text as="h2" textColor="color-text-black" variant="headline">
            El marketing no es presencia. Es flujo de comensales.
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            No vendemos publicaciones ni seguidores. Montamos una máquina que
            entra gente por la puerta y te enseña, semana a semana, de dónde
            vino cada reserva y cuánto costó.
          </Text>
        </div>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 5 }}>
        <div className="home__stack home__stack--tight">
          <Text as="p" textColor="color-text-black" variant="title">
            Lo que cambia
          </Text>
          <Text
            as="p"
            className="home__measure--narrow"
            textColor="color-on-surface-var"
            variant="body"
          >
            Dejas de preguntarte si funcionó. Abres el informe del lunes y lo
            ves: cuántas reservas, de qué canal, a qué costo por comensal.
          </Text>
        </div>
      </Col>
    </Container>
  </section>
);

export default Solucion;
