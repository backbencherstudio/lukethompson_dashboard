"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/lib/validation/auth.schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { maskEmail } from "@/lib/utils";
import { useEffect, useState } from "react";

export const ForgotPasswordForm = () => {
  const { forgotPassword, isLoading, emailForReset } = useAuth();
  const [maskedEmail, setMaskedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: emailForReset || "",
    },
  });

  const currentEmail = watch("email");

  useEffect(() => {
    if (currentEmail) {
      setMaskedEmail(maskEmail(currentEmail));
    }
  }, [currentEmail]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPassword(data);
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white font-liberation">
          Forgot Password
        </h1>
        <p className="mt-2 text-base font-normal text-white-secondary">
          Enter your registered email address. We`ll send you a code to reset
          your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder={maskedEmail || "Enter your email"}
          required
          error={errors.email?.message}
          success={!!currentEmail && !errors.email}
          {...register("email")}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="rounded-xl"
        >
          Send OTP
        </Button>
      </form>
    </div>
  );
};
