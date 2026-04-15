"use client";

import { SuccessMessage } from "@/components/auth/SuccessMessage";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function SuccessPage() {
  return (
    <AuthLayout
      imageSrc="/successChange.jpg"
      imageAlt="Password Changed Successfully"
    >
      <SuccessMessage />
    </AuthLayout>
  );
}
