"use client";
import { Container } from 'citrica-ui-toolkit';
import ForgotPassword from "@/shared/components/organisms/forgot-password";

const ForgotPasswordPage = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <ForgotPassword />
    </Container>
  );
};

export default ForgotPasswordPage;
