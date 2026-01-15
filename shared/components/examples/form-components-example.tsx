"use client";
import React, { useState } from "react";
import {
  Input,
  Textarea,
  Select,
  Button,
  Card,
  Text,
  Icon,
} from "citrica-ui-toolkit";

import { Container, Col } from "@/styles/07-objects/objects";

const FormComponentsExample = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    category: "",
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const countryOptions = [
    { value: "pe", label: "Perú" },
    { value: "co", label: "Colombia" },
    { value: "mx", label: "México" },
    { value: "ar", label: "Argentina" },
    { value: "cl", label: "Chile" },
    { value: "br", label: "Brasil" },
  ];

  const categoryOptions = [
    {
      value: "medicina",
      label: "Medicina",
      description: "Ciencias de la salud",
    },
    {
      value: "gastronomia",
      label: "Gastronomía",
      description: "Artes culinarias",
    },
    {
      value: "historia",
      label: "Historia",
      description: "Ciencias históricas",
    },
    {
      value: "arqueologia",
      label: "Arqueología",
      description: "Ciencias arqueológicas",
    },
    {
      value: "ingenieria",
      label: "Ingeniería",
      description: "Ciencias exactas",
    },
  ];

  return (
    <Container className="flex justify-center">
      <Card className="p-8">
        <Col noPadding className="mb-4" cols={{ lg: 12, md: 6, sm: 4 }}>
          <h3>
            <Text className="mb-6" textColor="color-on-surface" variant="title">
              Ejemplo de Componentes de Formulario
            </Text>
          </h3>
          <p>
            <Text className="mt-2" textColor="color-black" variant="body">
              Demostración de los componentes Input, Textarea y Select del
              Citrica UI System
            </Text>
          </p>
        </Col>

        <Col
          noPadding
          className="flex flex-col lg:flex-row gap-4 mb-4"
          cols={{ lg: 12, md: 6, sm: 4 }}
        >
          {/* Input básico */}
          <Input
            fullWidth
            required
            className="!p-0"
            label="Nombre completo"
            placeholder="Ingresa tu nombre"
            startIcon="User"
            value={formData.name}
            onValueChange={handleInputChange("name")}
          />

          {/* Input con validación de email */}
          <Input
            fullWidth
            required
            className="!p-0"
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            startIcon="Mail"
            type="email"
            value={formData.email}
            onValueChange={handleInputChange("email")}
          />
        </Col>

        <Col
          noPadding
          className="flex flex-col lg:flex-row gap-4 sm:mb-4"
          cols={{ lg: 12, md: 6, sm: 4 }}
        >
          {/* Input de teléfono */}
          <Input
            fullWidth
            className="!p-0"
            description="Incluye el código de país"
            label="Teléfono"
            placeholder="+51 999 999 999"
            startIcon="Phone"
            type="tel"
            value={formData.phone}
            onValueChange={handleInputChange("phone")}
          />

          {/* Select simple */}
          <Select
            fullWidth
            required
            className="!p-0"
            label="País de origen"
            options={countryOptions}
            placeholder="Selecciona tu país"
            startIcon="Globe"
            onSelectionChange={(keys: any) => {
              const value = Array.from(keys)[0] as string;

              handleInputChange("country")(value);
            }}
          />
        </Col>

        <Col
          noPadding
          className="flex flex-col lg:flex-row gap-4 sm:mb-4"
          cols={{ lg: 12, md: 6, sm: 4 }}
        >
          {/* Select con descripciones */}
          <Select
            fullWidth
            className="!p-0 mb-4"
            description="Elige el área de estudio que más te interese"
            label="Categoría de interés"
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            startIcon="BookOpen"
            onSelectionChange={(keys: any) => {
              const value = Array.from(keys)[0] as string;

              handleInputChange("category")(value);
            }}
          />

          {/* Textarea */}
          <Textarea
            fullWidth
            className="!p-0"
            description={`${formData.message.length}/500 caracteres`}
            label="Mensaje adicional"
            maxLength={500}
            placeholder="Cuéntanos más sobre tus intereses..."
            rows={4}
            value={formData.message}
            onValueChange={handleInputChange("message")}
          />
        </Col>

        <Col
          noPadding
          className=" flex justify-end item-end flex-col mt-4"
          cols={{ lg: 12, md: 6, sm: 4 }}
        >
          {/* Botón de envío */}
          <div className="text-center pt-4">
            <Button
              label="Enviar formulario"
              startContent={<Icon name="Check" size={24} />}
              textVariant="body"
              variant="primary"
              onClick={() => {
                console.log("Datos del formulario:", formData);
                alert(
                  "Formulario enviado! Revisa la consola para ver los datos.",
                );
              }}
            />
          </div>
        </Col>

        {/* Vista previa de datos */}
        <Card className="mt-8 bg-gray-50">
          <div className="p-6">
            <Text className="mb-4" textColor="color-black" variant="subtitle">
              Vista previa de los datos:
            </Text>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </Card>
      </Card>
    </Container>
  );
};

export default FormComponentsExample;
