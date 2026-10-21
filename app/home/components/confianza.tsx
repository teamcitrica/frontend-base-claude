"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Section, Stack } from "@/shared/components/layout";

/**
 * Por qué confiar. Credibilidad de operador, que es el argumento que
 * desarma al visitante quemado por agencias: no somos consultores, somos
 * dueños de restaurante.
 */
const Confianza = () => (
  <Section id="confianza" tone="surface">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 7 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-black" variant="headline">
            Entendemos tu negocio porque lo vivimos
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Somos dueños de restaurante. Sabemos lo que se siente un martes a
            las once de la noche con el salón vacío y la planilla del viernes
            encima. Por eso no te vamos a hablar de alcance ni de comunidad: te
            vamos a hablar de mesas.
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="body"
          >
            Nada de contratos de doce meses para &laquo;construir marca&raquo;.
            Empezamos por el estudio gratuito y decides con datos en la mano.
          </Text>
        </Stack>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 5 }}>
        <Stack gap={2}>
          {/* ILUSTRATIVO — reemplazar por testimonio real antes de publicar */}
          <Text
            as="p"
            className="u-measure-narrow"
            textColor="color-text-black"
            variant="title"
          >
            &laquo;Por primera vez sé de dónde viene cada reserva.&raquo;
          </Text>
          <Text as="p" textColor="color-on-surface-var" variant="label">
            Equipo ImPulso · dueños de restaurante
          </Text>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Confianza;
