"use client";

import { Button } from "citrica-ui-toolkit";

import {
  MENSAJE_COTIZAR,
  MENSAJE_DEMO,
  URL_PRUEBA,
  whatsappUrl,
} from "./cuenta";

interface ConversionButtonProps {
  label?: string;
  fullWidth?: boolean;
}

// Enlaces reales (`href` + `isExternal`: pestaña nueva con `rel` seguro). El
// texto en `body` para que el CTA no se parta en sm.

/** CTA primario: demo por WhatsApp. */
export const DemoButton = ({
  label = "Pedir demo por WhatsApp",
  fullWidth,
}: ConversionButtonProps) => (
  <Button
    isExternal
    fullWidth={fullWidth}
    href={whatsappUrl(MENSAJE_DEMO)}
    label={label}
    textVariant="body"
    variant="primary"
  />
);

/** CTA secundario: prueba gratis de 7 días. */
export const TrialButton = ({
  label = "Prueba gratis 7 días",
  fullWidth,
}: ConversionButtonProps) => (
  <Button
    isExternal
    fullWidth={fullWidth}
    href={URL_PRUEBA}
    label={label}
    textVariant="body"
    variant="secondary"
  />
);

/** CTA de la cuenta: cotizar el plan fijo por WhatsApp (no hay precio público). */
export const QuoteButton = ({
  label = "Cotiza tu plan fijo",
  fullWidth,
}: ConversionButtonProps) => (
  <Button
    isExternal
    fullWidth={fullWidth}
    href={whatsappUrl(MENSAJE_COTIZAR)}
    label={label}
    textVariant="body"
    variant="primary"
  />
);
