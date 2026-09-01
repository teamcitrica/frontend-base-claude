"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

/**
 * Sistema Mesa Activa — los 4 pasos.
 * Única sección numerada de la página: aquí el orden SÍ informa, es una
 * secuencia real. Numerar cada sección por reflejo es andamiaje, no voz.
 */
const steps = [
  {
    index: "01",
    title: "Diagnóstico de visibilidad",
    body: "Medimos dónde apareces hoy, qué buscan tus comensales y qué está capturando tu competencia.",
  },
  {
    index: "02",
    title: "Posicionamiento local",
    body: "Ordenamos ficha, reseñas, carta y redes para que quien busca dónde comer cerca te encuentre primero.",
  },
  {
    index: "03",
    title: "Adquisición de comensales",
    body: "Contenido y pauta con un solo objetivo: reservas. Cada sol se rastrea hasta la mesa.",
  },
  {
    index: "04",
    title: "Optimización semanal",
    body: "Informe cada lunes. Lo que funciona sube, lo que no se corta. Sin esperar al cierre de mes.",
  },
];

const Metodo = () => (
  <section className="home__section home__section--airy" id="metodo">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8 }}>
        <div className="home__stack mb-4">
          <Text as="h2" textColor="color-text-black" variant="headline">
            El Sistema Mesa Activa
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Cuatro pasos en orden. Cada uno se apoya en el anterior, y ninguno
            se salta.
          </Text>
        </div>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <ol className="home__steps">
          {steps.map((step) => (
            <li key={step.index} className="home__step">
              <Text
                as="span"
                className="home__step-index"
                textColor="color-primary"
                variant="title"
              >
                {step.index}
              </Text>
              <Text as="h3" textColor="color-text-black" variant="title">
                {step.title}
              </Text>
              <Text as="p" textColor="color-on-surface-var" variant="body">
                {step.body}
              </Text>
            </li>
          ))}
        </ol>
      </Col>
    </Container>
  </section>
);

export default Metodo;
