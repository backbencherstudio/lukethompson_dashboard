"use client";

import { VerifyOTPForm } from "@/components/auth/VerifyOTPForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants";

export default function VerifyOTPPage() {
  const { emailForReset } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!emailForReset) {
      router.push(ROUTES.FORGOT_PASSWORD);
    }
  }, [emailForReset, router]);

  if (!emailForReset) {
    return null;
  }

  return (
    <AuthLayout imageSrc="/otp.jpg" imageAlt="Verify OTP">
      <VerifyOTPForm />
    </AuthLayout>
  );
}
