"use client";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout imageSrc="/forgetPass.jpg" imageAlt="Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
