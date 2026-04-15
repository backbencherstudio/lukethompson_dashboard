"use client";

import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface TableHeaderProps {
  title?: string;
  showHeader?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  headerAction?: ReactNode;
}

export function TableHeader({
  title,
  showHeader = true,
  showSearch = true,
  searchPlaceholder = "Search...",
  onSearch,
  headerAction,
}: TableHeaderProps) {
  if (!showHeader) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 px-1 border-b border-border-light">
      {title && <h3 className="text-base font-bold text-white">{title}</h3>}

      <div
        className={cn(
          "flex flex-col sm:flex-row items-stretch sm:items-center gap-3",
          !title && "sm:ml-auto",
        )}
      >
        {showSearch && (
          <div className="relative w-full sm:w-[237px]">
            <Input
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="h-9 bg-white/10 border-border-light pl-9 w-full"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white-secondary" />
          </div>
        )}
        {headerAction && <div className="w-full sm:w-auto">{headerAction}</div>}
      </div>
    </div>
  );
}
