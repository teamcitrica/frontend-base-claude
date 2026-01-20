"use client";
import React, { useState } from "react";
import { Text, Input, Button, Modal, Icon } from "citrica-ui-toolkit";
import { Divider, Link } from "@heroui/react";

import { Container } from "@/styles/07-objects/objects";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      // Simular envío de email
      setTimeout(() => {
        setIsLoading(false);
        setShowEmailSentModal(true);
      }, 1000);
    }
  };

  return (
    <Container className="w-[968px] flex justify-center items-center !flex-nowrap">
      <div className="container-inputs">
        <img
          alt="Logo"
          className="w-[80px] pb-3 items-center"
          src="/img/citrica-logo.png"
        />
        <h2 className="mb-4">
          <Text variant="body" weight="bold">
            ¿No puedes iniciar sesión?
          </Text>
        </h2>
        <p className="mb-4">
          <Text className="text-forgot-password" variant="label">
            Escribe tu correo para recuperar el acceso.
          </Text>
        </p>
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            required
            className="!p-0"
            description="Te enviaremos un enlace para restablecerla."
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            disabled={isLoading}
            label={isLoading ? "Enviando..." : "Enviar enlace"}
            type="submit"
            variant="primary"
          />
        </form>

        <div className="w-[312px] mt-4 flex flex-col justify-center items-center">
          <Divider className="w-[210px] h-[1px] bg-[#E5E7EB] mt-[14px] mb-2" />
          <Link href="/login">
            <Text textColor="color-primary" variant="label">
              Volver al inicio de sesión
            </Text>
          </Link>
        </div>
      </div>
      <div className="bg-login not-sm" />

      {/* Modal de Email Enviado */}
      <Modal
        className="text-center"
        hideCloseButton={true}
        isDismissable={true}
        isOpen={showEmailSentModal}
        size="sm"
        onClose={() => setShowEmailSentModal(false)}
      >
        <div className="flex flex-col items-center py-6 px-4">
          {/* Icono de check */}
          <div className="flex items-center justify-center mb-4">
            <Icon
              color="var(--color-primary)"
              name="CircleCheckBig"
              size={32}
            />
          </div>
          <h3 className="mb-3">
            <Text variant="title" weight="bold">
              Correo enviado
            </Text>
          </h3>
          <p className="mb-6">
            <Text textColor="color-black" variant="body">
              Revisa tu bandeja y sigue el enlace para restablecer tu
              contraseña.
            </Text>
          </p>

          {/* Botón Cerrar */}
          <Button
            fullWidth
            className="mb-4"
            label="Cerrar"
            variant="primary"
            onClick={() => setShowEmailSentModal(false)}
          />

          {/* Link de login */}
          <div className="text-center">
            <Text textColor="color-black" variant="label">
              ¿Ya tienes una cuenta?{" "}
            </Text>
            <Link href="/login">
              <Text textColor="color-primary" variant="body" weight="bold">
                Inicia sesión
              </Text>
            </Link>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default ForgotPasswordPage;
