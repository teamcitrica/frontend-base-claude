"use client";

import { Text } from "citrica-ui-toolkit";

import {
  AutoGrid,
  Cell,
  Grid,
  Section,
  Stack,
} from "@/shared/components/layout";

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
  <Section id="metodo" rhythm="airy">
    <Grid rowGap={4}>
      <Cell span={{ lg: 8 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-black" variant="headline">
            El Sistema Mesa Activa
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Cuatro pasos en orden. Cada uno se apoya en el anterior, y ninguno
            se salta.
          </Text>
        </Stack>
      </Cell>

      <Cell>
        <AutoGrid as="ol" gap={10} minItemWidth={240}>
          {steps.map((step) => (
            <Stack key={step.index} as="li" className="home__step" gap={2}>
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
            </Stack>
          ))}
        </AutoGrid>
      </Cell>
    </Grid>
  </Section>
);

export default Metodo;
