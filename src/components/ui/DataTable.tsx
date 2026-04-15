"use client";

import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { MobileCardView } from "./MobileCardView";
import { DesktopTableView } from "./DesktopTableView";
import { Column } from "@/types/table.types";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  showHeader?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  headerAction?: ReactNode;
  maxRows?: number;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  title,
  showHeader = true,
  showSearch = true,
  searchPlaceholder = "Search...",
  onSearch,
  headerAction,
  maxRows,
  emptyMessage = "No data found",
  className,
}: DataTableProps<T>) {
  const displayData = maxRows ? data.slice(0, maxRows) : data;

  return (
    <div
      className={cn(
        "rounded-2xl bg-form-bg border border-border-light px-5",
        className,
      )}
    >
      {/* Header Section */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 px-1">
          {title && <h3 className="text-base font-bold text-white">{title}</h3>}

          <div
            className={cn(
              "flex flex-col sm:flex-row items-stretch sm:items-center gap-3",
              !title && "w-full",
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
            {headerAction && (
              <div className="w-full sm:w-auto">{headerAction}</div>
            )}
          </div>
        </div>
      )}

      {/* Mobile View */}
      <MobileCardView
        data={displayData}
        columns={columns}
        emptyMessage={emptyMessage}
      />

      {/* Desktop View */}
      <DesktopTableView
        data={displayData}
        columns={columns}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
