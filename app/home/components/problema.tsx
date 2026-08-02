"use client";

import Image from "next/image";
import { Col, Container, Icon, Text } from "citrica-ui-toolkit";

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
  <section
    className="home__section home__section--surface home__section--tight"
    id="problema"
  >
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <div className="home__stack">
          <Text as="h2" textColor="color-text-black" variant="headline">
            ¿Tu marketing es una caja negra?
          </Text>
          <Text
            as="p"
            className="home__measure"
            textColor="color-on-surface-var"
            variant="subtitle"
          >
            Si no puedes decir cuántas mesas te trajo el último sol invertido,
            no tienes marketing: tienes gasto.
          </Text>

          <ul className="home__pains">
            {pains.map((pain) => (
              <li key={pain.title} className="home__pain">
                <span className="home__pain-icon">
                  <Icon
                    color="var(--color-primary)"
                    name={pain.icon}
                    size={22}
                  />
                </span>
                <span className="home__stack home__stack--tight">
                  <Text as="h3" textColor="color-text-black" variant="title">
                    {pain.title}
                  </Text>
                  <Text
                    as="p"
                    className="home__measure"
                    textColor="color-on-surface-var"
                    variant="body"
                  >
                    {pain.body}
                  </Text>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Col>

      <Col cols={{ sm: 4, md: 6, lg: 6 }}>
        <div className="home__media home__media--tall">
          <Image
            fill
            alt="Comedor de restaurante con la mayoría de las mesas vacías"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </Col>
    </Container>
  </section>
);

export default Problema;
