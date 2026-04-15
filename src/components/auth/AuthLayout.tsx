"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt?: string;
}

export const AuthLayout = ({
  children,
  imageSrc,
  imageAlt = "Authentication Illustration",
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Image Section (Hidden on mobile) */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-black-bg to-form-bg">
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right Side - Form Section (Full width on mobile) */}
      <div className="flex w-full items-center justify-center bg-black-bg px-4 py-8 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-[440px] xl:max-w-[600px]">
          <div className="rounded-xl bg-form-bg p-6 sm:p-8 shadow-xl border border-border-light">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
