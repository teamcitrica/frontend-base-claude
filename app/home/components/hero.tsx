"use client";

import Image from "next/image";
import { Button, Col, Container, Text } from "citrica-ui-toolkit";

import { scrollToSection } from "./scroll-to";

/**
 * Hero — único bloque carbón de la página.
 * Escena: el dueño revisando el móvil un martes a las 11pm con el local vacío.
 * Por eso es oscuro: no es un tema, es el momento del visitante.
 */
const Hero = () => (
  <section className="home__hero" id="hero">
    <div className="home__hero-media">
      <Image
        fill
        priority
        alt="Cocinero emplatando bajo las lámparas de calor de una cocina de restaurante"
        className="object-cover"
        sizes="100vw"
        src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80"
      />
    </div>
    <div className="home__hero-scrim" />

    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 8 }}>
        <div className="home__hero-body">
          <Text
            as="span"
            textColor="color-tertiary"
            variant="label"
            weight="bold"
          >
            Agencia de marketing gastronómico
          </Text>

          <Text
            as="h1"
            className="home__hero-title"
            textColor="color-text-white"
            variant="display"
          >
            Deja de adivinar si tu marketing{" "}
            <span className="home__underline">funciona</span>
          </Text>

          <Text
            as="p"
            className="home__hero-lead"
            textColor="color-text-white"
            variant="subtitle"
          >
            Empieza a llenar mesas con datos, no con suerte. Del plato a la
            pantalla, y de la pantalla a la mesa llena.
          </Text>

          <div className="home__hero-actions">
            {/* `textVariant="body"` sube el label de 11px a 14/16.
                El blanco sobre naranja se queda en 3.38:1 — excepción que
                `product.md` documenta para botones. */}
            <Button
              label="Agenda tu estudio gratuito"
              size="lg"
              textVariant="body"
              variant="primary"
              onPress={() => scrollToSection("agenda")}
            />
            {/* Enlace, no botón: ni `flat` ni `secondary` dan contraste
                suficiente sobre la foto, y el contrato prohíbe re-estilar
                botones desde el SCSS de página. Además un segundo botón
                competía con el CTA único. */}
            <Text
              as="a"
              href="#metodo"
              textColor="color-text-white"
              textDecoration="underline"
              variant="label"
              weight="bold"
            >
              Cómo funciona
            </Text>
          </div>
        </div>
      </Col>
    </Container>
  </section>
);

export default Hero;
