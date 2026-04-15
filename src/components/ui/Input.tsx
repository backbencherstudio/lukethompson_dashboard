"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, required, success, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white"
          >
            {label}
            {required && <span className="ml-1 text-error-red">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white-secondary",
              "transition-all duration-200",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "focus:outline-none focus:ring-2 focus:ring-green-success focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-error-red focus:ring-error-red",
              success && "border-green-success",
              !error && !success && "border-border-light",
              className,
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-error-red"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
