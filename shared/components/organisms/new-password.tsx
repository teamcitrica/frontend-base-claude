"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Container, Text, Input, Icon, Button, Modal } from "citrica-ui-toolkit";
import { Divider, Link } from "@heroui/react";

type FormValues = {
  password: string;
};

const NewPasswordPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Aquí iría la lógica para cambiar la contraseña
      console.log("Nueva contraseña:", data.password);
      // Simular éxito y mostrar modal
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
      }, 1000);
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    setShowSuccessModal(false);
    router.push("/login");
  };

  return (
    <Container className="w-[968px] flex justify-center !flex-nowrap">
      <div className="container-inputs">
        <img
          alt="Logo"
          className="w-[80px] pb-3 items-center"
          src="/img/citrica-logo.png"
        />
        <h2 className="text-center mb-4">
          <Text textColor="white" variant="body">
            Crea una nueva contraseña
          </Text>
        </h2>
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Nueva contraseña"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            required
            className="!p-0"
            disabled={isLoading}
            endContent={
              <Icon
                className="cursor-pointer"
                color="#66666666"
                name="Eye"
                size={12}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            }
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            label={isLoading ? "Guardando..." : "Guardar contraseña"}
            type="submit"
            variant="primary"
          />
        </form>
        <div className="w-[312px] mt-4 flex flex-col justify-center items-center">
          <Divider className="w-[210px] h-[1px] bg-[#E5E7EB] mt-[14px] mb-2" />
          <Link href="/login">
            <Text textColor="color-primary" variant="body">
              Cancelar
            </Text>
          </Link>
        </div>
      </div>
      <div className="bg-login not-sm" />

      {/* Modal de Confirmación */}
      <Modal
        className="text-center"
        hideCloseButton={true}
        isDismissable={true}
        isOpen={showSuccessModal}
        size="sm"
        onClose={() => setShowSuccessModal(false)}
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
              ¡Contraseña reestablecida exitosamente!
            </Text>
          </h3>
          <p className="mb-6">
            <Text textColor="color-black" variant="body">
              Ya puedes iniciar sesión con tu nueva contraseña.
            </Text>
          </p>

          {/* Botón para ir al login */}
          <Button
            fullWidth
            className="mb-4"
            label="Ir al inicio de sesión"
            variant="primary"
            onClick={handleGoToLogin}
          />
        </div>
      </Modal>
    </Container>
  );
};

export default NewPasswordPage;
