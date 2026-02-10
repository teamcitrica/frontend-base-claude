"use client";
import { Container } from 'citrica-ui-toolkit';
import NewPassword from "@/shared/components/citrica-ui/organism/new-password";
import { use } from 'react';

const NewPasswordPage = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <NewPassword />
    </Container>
  );
};

export default NewPasswordPage;
