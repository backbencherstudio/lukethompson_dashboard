"use client";

import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { DesktopTableView } from "./DesktopTableView";
import { MobileCardView } from "./MobileCardView";
import { Column } from "@/types/table.types";
import { cn } from "@/lib/utils";

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
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
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
  pagination,
}: DataTableProps<T>) {
  const displayData = maxRows ? data.slice(0, maxRows) : data;

  return (
    <div
      className={cn(
        "rounded-2xl bg-form-bg border border-border-light",
        className,
      )}
    >
      {showHeader && (
        <div className="flex flex-col gap-4 p-5  sm:flex-row sm:items-center sm:justify-between">
          {title && <h3 className="text-base font-bold text-white">{title}</h3>}

          <div
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:items-center",
              !title && "sm:ml-auto",
            )}
          >
            {showSearch && (
              <div className="relative w-full sm:w-[237px]">
                <Input
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="h-9 bg-white/10 border-border-light pl-9"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white-secondary" />
              </div>
            )}
            {headerAction}
          </div>
        </div>
      )}

      <DesktopTableView
        data={displayData}
        columns={columns}
        emptyMessage={emptyMessage}
      />
      <MobileCardView
        data={displayData}
        columns={columns}
        emptyMessage={emptyMessage}
      />

      {pagination && !maxRows && pagination.totalPages > 1 && (
        <div className="border-t border-border-light px-5 py-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}
