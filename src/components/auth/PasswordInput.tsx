"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, InputProps } from "@/components/ui/Input";

interface PasswordInputProps extends Omit<InputProps, "type"> {
  showStrengthMeter?: boolean;
}

export const PasswordInput = ({
  showStrengthMeter,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        className={props.className}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[50px] -translate-y-1/2 text-white-secondary hover:text-white transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};
