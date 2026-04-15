"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
