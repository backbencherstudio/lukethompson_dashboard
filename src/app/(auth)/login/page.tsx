"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout imageSrc="/signin.png" imageAlt="Sign In">
      <LoginForm />
    </AuthLayout>
  );
}
