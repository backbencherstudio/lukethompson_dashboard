"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { PasswordValidation } from "@/types";
import { cn } from "@/lib/utils";

interface PasswordRequirementsProps {
  password: string;
  validation?: PasswordValidation;
  className?: string;
}

export const PasswordRequirements = ({
  password,
  validation,
  className,
}: PasswordRequirementsProps) => {
  const requirements = validation || {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const items = [
    { label: "At least 8 characters long", met: requirements.hasMinLength },
    {
      label: "Include uppercase & lowercase letters",
      met: requirements.hasUpperCase && requirements.hasLowerCase,
    },
    { label: "Add at least one number", met: requirements.hasNumber },
    {
      label: "Use a special character (e.g. @, #, $)",
      met: requirements.hasSpecialChar,
    },
  ];

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.met ? (
            <CheckCircle2 className="h-5 w-5 text-green-success" />
          ) : (
            <Circle className="h-5 w-5 text-white-secondary" />
          )}
          <span
            className={cn(
              "text-sm",
              item.met ? "text-white" : "text-white-secondary",
            )}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
1