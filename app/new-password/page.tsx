"use client";
import { Container } from 'citrica-ui-toolkit';
import { Suspense } from 'react';
import NewPassword from "@/shared/components/citrica-ui/organism/new-password";

const NewPasswordPage = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <Suspense fallback={<div>Cargando...</div>}>
        <NewPassword />
      </Suspense>
    </Container>
  );
};

export default NewPasswordPage;
