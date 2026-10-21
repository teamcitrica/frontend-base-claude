"use client";

import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Icon,
  Input,
  Text,
  Textarea,
} from "citrica-ui-toolkit";

import { AutoGrid, Cluster, Section, Stack } from "@/shared/components/layout";

/**
 * CTA final + formulario. Único evento de conversión de la página.
 *
 * ⚠️ El formulario NO persiste nada: no escribe en Supabase, no hace fetch,
 * no manda correo. Decisión explícita de la SPEC-0001 (fuera de alcance) —
 * el repo no tiene `.env*`, así que ni siquiera sería verificable hoy.
 * Candidata a la spec 0002.
 */

interface FormState {
  nombre: string;
  restaurante: string;
  email: string;
  whatsapp: string;
  mensaje: string;
}

const EMPTY: FormState = {
  nombre: "",
  restaurante: "",
  email: "",
  whatsapp: "",
  mensaje: "",
};

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const Agenda = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [sent, setSent] = useState(false);

  const setField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const submit = () => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.nombre.trim()) next.nombre = "Escribe tu nombre.";
    if (!form.restaurante.trim())
      next.restaurante = "¿Cómo se llama tu restaurante?";
    if (!form.email.trim())
      next.email = "Necesitamos un correo para escribirte.";
    else if (!emailOk(form.email)) next.email = "Ese correo no parece válido.";
    if (!form.whatsapp.trim())
      next.whatsapp = "Un WhatsApp para coordinar la llamada.";

    setErrors(next);

    if (Object.keys(next).length > 0) return;

    // Sin red: la confirmación es en pantalla y nada sale del navegador.
    setSent(true);
    setForm(EMPTY);
  };

  return (
    <Section id="agenda" rhythm="airy">
      <Container>
        <Col cols={{ sm: 4, md: 6, lg: 5 }}>
          <Stack gap={6}>
            <Text as="h2" textColor="color-text-black" variant="headline">
              ¿Hablamos esta semana?
            </Text>
            <Text
              as="p"
              className="u-measure-prose"
              textColor="color-on-surface-var"
              variant="subtitle"
            >
              El estudio gratuito son 45 minutos. Salimos con tu diagnóstico de
              visibilidad y una estimación de cuántas mesas puedes llenar.
            </Text>
            <Cluster align="start" gap={2} wrap={false}>
              <span className="home__pain-icon">
                <Icon color="var(--color-primary)" name="Clock" size={20} />
              </span>
              <Text as="p" textColor="color-on-surface-var" variant="label">
                Te respondemos dentro de las siguientes 24 horas hábiles.
              </Text>
            </Cluster>
          </Stack>
        </Col>

        <Col cols={{ sm: 4, md: 6, lg: 7 }}>
          {sent ? (
            <Stack className="home__form-status" gap={2} role="status">
              <Text as="p" textColor="color-primary" variant="title">
                ¡Listo!
              </Text>
              <Text as="p" textColor="color-on-surface-var" variant="body">
                Gracias. Te contactamos esta semana para agendar tu estudio
                gratuito.
              </Text>
              <Button
                label="Enviar otra solicitud"
                variant="flat"
                onPress={() => setSent(false)}
              />
            </Stack>
          ) : (
            <Stack gap={6}>
              <AutoGrid gap={6} minItemWidth={220}>
                <Input
                  errorMessage={errors.nombre}
                  isInvalid={Boolean(errors.nombre)}
                  label="Tu nombre"
                  placeholder="Ana Quispe"
                  value={form.nombre}
                  onValueChange={setField("nombre")}
                />
                <Input
                  errorMessage={errors.restaurante}
                  isInvalid={Boolean(errors.restaurante)}
                  label="Tu restaurante"
                  placeholder="Cevichería La Punta"
                  value={form.restaurante}
                  onValueChange={setField("restaurante")}
                />
              </AutoGrid>

              <AutoGrid gap={6} minItemWidth={220}>
                <Input
                  errorMessage={errors.email}
                  isInvalid={Boolean(errors.email)}
                  label="Correo"
                  placeholder="ana@lapunta.pe"
                  type="email"
                  value={form.email}
                  onValueChange={setField("email")}
                />
                <Input
                  errorMessage={errors.whatsapp}
                  isInvalid={Boolean(errors.whatsapp)}
                  label="WhatsApp"
                  placeholder="+51 999 999 999"
                  type="tel"
                  value={form.whatsapp}
                  onValueChange={setField("whatsapp")}
                />
              </AutoGrid>

              <Textarea
                label="¿Qué has probado hasta ahora?"
                minRows={3}
                placeholder="Opcional. Nos ayuda a llegar preparados."
                value={form.mensaje}
                onValueChange={setField("mensaje")}
              />

              <Button
                fullWidth
                label="Agendar mi estudio gratuito"
                size="lg"
                textVariant="body"
                variant="primary"
                onPress={submit}
              />
            </Stack>
          )}
        </Col>
      </Container>
    </Section>
  );
};

export default Agenda;
