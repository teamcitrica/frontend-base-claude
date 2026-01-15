"use client";
import React from "react";
import { Button, Text, Icon, Select, Input } from "citrica-ui-toolkit";
import { useTheme } from "next-themes";
import { addToast } from "@heroui/toast";

import { Container, Col } from "@/styles/07-objects/objects";
const SectionTypography = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Container>
        <Col cols={{ lg: 12, md: 6, sm: 4 }}>
          <div>
            <Icon name="AlarmClockMinus" size={40} />
            <Icon name="ChevronLeft" size={80} />
          </div>
          <h1>
            <Text textColor="color-on-container" variant="display">
              Display
            </Text>
          </h1>
          <section>
            <h2>
              <Text textColor="color-on-container" variant="headline">
                Headline
              </Text>
            </h2>
          </section>
          <h3>
            <Text textColor="color-on-container" variant="title">
              Title
            </Text>
          </h3>
          <h4>
            <Text color="#F00" variant="subtitle">
              Subtitle
            </Text>
          </h4>
          <p>
            <Text variant="body" weight="bold">
              Body
            </Text>
          </p>
          <p className="mb-8">
            <Text variant="label">Label</Text>
          </p>
          <div>
            <Button
              label="New Toast Test"
              variant="primary"
              onClick={() => {
                addToast({
                  title: "Toast title",
                  description: "Toast displayed successfully",
                  color: "success",
                });
              }}
            />
          </div>
        </Col>
        <div className="flex flex-col gap-4 mb-6">
          <p className="text-lg font-bold">Inputs con Citrica Design System:</p>

          <Input
            label="Nombre completo"
            placeholder="Escribe tu nombre aquí"
            variant="primary"
          />

          <Input
            required
            label="Correo electrónico"
            placeholder="tu@email.com"
            startIcon="Mail"
            type="email"
            variant="secondary"
          />

          <Input
            label="Teléfono"
            placeholder="+51 999 999 999"
            startIcon="Phone"
            type="tel"
            variant="primary"
          />
        </div>
        <div>
          <Select
            required
            label="País"
            options={[
              { value: "es", label: "España" },
              { value: "mx", label: "México" },
              { value: "ar", label: "Argentina" },
            ]}
            placeholder="prueba de que sirve johan"
            startIcon="Globe"
            variant="primary"
            onSelectionChange={(keys) => {
              console.log("Seleccionado:", keys);
            }}
          />
        </div>
      </Container>
      <Container>
        <Col cols={{ lg: 12, md: 6, sm: 4 }}>
          <button
            className="rounded-md p-2 hover:bg-accent"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Icon
              className="text-on-accent"
              name="Sun"
              size={24}
              strokeWidth={1.4}
            />
            <Text className="sr-only" variant="label">
              Toggle theme
            </Text>
          </button>
        </Col>
      </Container>
    </>
  );
};

export default SectionTypography;
