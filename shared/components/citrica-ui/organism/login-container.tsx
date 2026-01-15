"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Icon, Text } from "citrica-ui-toolkit";
import { addToast } from "@heroui/toast";
import { useForm } from "react-hook-form";
import { Divider, Link } from "@heroui/react";

import { UserAuth } from "@/shared/context/auth-context";
import { Container } from "@/styles/07-objects/objects";

type FormValues = {
  password: string;
  email: string;
};

const LoginContainer = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signInWithPassword, userSession, isInitializing } = UserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirigir a admin si ya está autenticado (solo una vez)
  useEffect(() => {
    if (!isInitializing && userSession) {
      router.replace("/admin");
    }
  }, [userSession, isInitializing, router]);

  // Si está inicializando o ya hay sesión, no mostrar el formulario
  if (isInitializing || userSession) {
    return null;
  }

  const onSubmit = async (data: FormValues) => {
    if (!data.email || !data.password) {
      addToast({
        title: "Error",
        description: "Por favor ingresa tu correo y contraseña.",
        color: "danger",
      });

      return;
    }

    setIsLoading(true);

    try {
      const { respData, respError } = await signInWithPassword(
        data.email,
        data.password,
      );

      if (respError) {
        addToast({
          title: "Error al iniciar sesión",
          description: respError.message || "Correo o contraseña incorrectos.",
          color: "danger",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      addToast({
        title: "Error",
        description: "Intenta nuevamente más tarde.",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
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
            ¡Bienvenido!
          </Text>
        </h2>
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Correo electónico"
            type="email"
            {...register("email")}
            required
            className="!p-0"
            disabled={isLoading}
          />
          <Input
            placeholder="Contraseña"
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
            className="mt-2"
            disabled={isLoading}
            fullWidth={true}
            isLoading={isLoading}
            label={isLoading ? "Accediendo..." : "Iniciar sesión"}
            type="submit"
            variant="primary"
          />
        </form>

        <div className="w-[312px] mt-4 flex flex-col justify-center items-center">
          <Divider className="w-[210px] h-[1px] bg-[#E5E7EB] mt-[14px] mb-2" />
          <Link href="/forgot-password">
            <Text textColor="color-primary" variant="label">
              ¿Olvidaste tu contraseña?
            </Text>
          </Link>
        </div>
      </div>
      <div className="bg-login not-sm" />
    </Container>
  );
};

export default LoginContainer;
