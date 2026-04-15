"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  placeholder?: string;
  className?: string;
}

export const SelectDropdown = ({
  options,
  value,
  onChange,
  width = "180px",
  placeholder = "Select",
  className,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn("relative", className)}
      style={{ width }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-white/10 px-4 py-2 text-sm transition-all duration-200",
          "bg-white/5 text-white backdrop-blur-sm",
          "hover:bg-white/10 hover:border-white/20",
          "focus:outline-none focus:ring-2 focus:ring-green-success",
          isOpen && "border-green-success bg-white/10",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-white-secondary transition-transform duration-200",
            isOpen && "rotate-180 text-green-success",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-form-bg shadow-xl backdrop-blur-sm">
          <div className="max-h-60 overflow-y-auto  custom-scrollbar">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm transition-colors duration-150",
                  option === value
                    ? "bg-green-success/20 text-green-success"
                    : "text-white-secondary hover:bg-white/10 hover:text-white",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
