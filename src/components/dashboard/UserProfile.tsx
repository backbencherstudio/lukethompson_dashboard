"use client";

import Image from "next/image";
import { useAppSelector } from "@/lib/redux/hooks";

export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border-light">
        <Image
          src="/Avatar.png"
          alt="Profile"
          fill
          sizes="30px"
          className="object-cover"
        />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-white">
          {user?.name || "Kristin Rodriguez"}
        </p>
        <p className="text-xs text-white-secondary capitalize">
          {user?.role || "admin"}
        </p>
      </div>
    </div>
  );
};
