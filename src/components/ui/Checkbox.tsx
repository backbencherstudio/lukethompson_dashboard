"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            id={checkboxId}
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-border-light bg-white/10",
              "text-green-success focus:ring-2 focus:ring-green-success focus:ring-offset-0",
              "cursor-pointer transition-all duration-200",
              "checked:bg-green-success checked:border-green-success",
              error && "border-error-red",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-2 cursor-pointer select-none text-sm text-white-secondary"
          >
            {label}
          </label>
        )}
        {error && (
          <p className="ml-2 text-xs text-error-red" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
