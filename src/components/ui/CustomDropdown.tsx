"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  trigger: ReactNode;
  align?: "left" | "right";
  width?: string;
}

export const CustomDropdown = ({
  options,
  trigger,
  align = "right",
  width = "160px",
}: CustomDropdownProps) => {
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
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur-[5px]",
            align === "right" ? "right-0" : "left-0",
          )}
          style={{ width }}
        >
          <div className="flex flex-col ">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    option.onClick?.();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 rounded-lg text-center",
                    option.className || "text-white hover:bg-white/10",
                  )}
                >
                  {option.icon && (
                    <span className="flex-shrink-0">{option.icon}</span>
                  )}
                  <span className="flex-1 text-left">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
