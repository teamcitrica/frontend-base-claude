"use client";

import Image from "next/image";
import { Col, Container, Icon, Text } from "citrica-ui-toolkit";

import { Cluster, Media, Section, Stack } from "@/shared/components/layout";

/**
 * El problema. Aquí el visitante se reconoce.
 * Tramo apretado a propósito: el dolor no respira.
 */
const pains = [
  {
    icon: "Wallet" as const,
    title: "Metes plata y no sabes si vuelve",
    body: "Pagas fotos, video y pauta cada mes. Nadie te dice cuántos comensales entraron por la puerta gracias a eso.",
  },
  {
    icon: "EyeOff" as const,
    title: "Te ven, pero no te reservan",
    body: "Miles de impresiones y likes que no se convierten en mesas ocupadas un martes por la noche.",
  },
  {
    icon: "MessageSquareOff" as const,
    title: "Los mensajes se enfrían",
    body: "Llegan consultas por redes y por WhatsApp, y se quedan sin responder mientras tú estás en cocina.",
  },
];

const Problema = () => (
  <Section id="problema" rhythm="tight" tone="surface">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <Stack gap={6}>
          <Text as="h2" textColor="color-text-black" variant="headline">
            ¿Tu marketing es una caja negra?
          </Text>
          <Text
            as="p"
            className="u-measure-prose"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Si no puedes decir cuántas mesas te trajo el último sol invertido,
            no tienes marketing: tienes gasto.
          </Text>

          <Stack as="ul" gap={6}>
            {pains.map((pain) => (
              <Cluster
                key={pain.title}
                align="start"
                as="li"
                className="home__pain"
                gap={3}
                wrap={false}
              >
                <span className="home__pain-icon">
                  <Icon
                    color="var(--color-primary)"
                    name={pain.icon}
                    size={22}
                  />
                </span>
                <Stack as="span" gap={2}>
                  <Text as="h3" textColor="color-text-black" variant="title">
                    {pain.title}
                  </Text>
                  <Text
                    as="p"
                    className="u-measure-prose"
                    textColor="color-on-surface-var"
                    variant="body"
                  >
                    {pain.body}
                  </Text>
                </Stack>
              </Cluster>
            ))}
          </Stack>
        </Stack>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <Media ratio="4/3">
          <Image
            fill
            alt="Comedor de restaurante con la mayoría de las mesas vacías"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
          />
        </Media>
      </Col>
    </Container>
  </Section>
);

export default Problema;
