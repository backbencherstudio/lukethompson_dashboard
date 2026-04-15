"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import Image from "next/image";

interface SuccessMessageProps {
  title?: string;
  message?: string;
  buttonText?: string;
}

export const SuccessMessage = ({
  title = "Password has been successfully updated",
  message = "You can now sign in with your new password.",
  buttonText = "Back to Login",
}: SuccessMessageProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center text-center">
      <Image src="/Illustration.png" alt="Success" width={379} height={200} />

      <h2 className="mb-2 text-2xl font-bold text-white font-liberation">
        {title}
      </h2>

      <p className="mb-8 text-sm font-normal text-white-secondary">{message}</p>

      <Button
        onClick={() => router.push(ROUTES.LOGIN)}
        fullWidth
        className="rounded-xl"
      >
        {buttonText}
      </Button>
    </div>
  );
};
