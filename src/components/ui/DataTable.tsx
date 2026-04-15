"use client";

import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
}

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
        "rounded-2xl bg-form-bg border border-border-light",
        className,
      )}
    >
      <div className="px-5">
        {/* Header Section */}
        {showHeader && (
          <div className="flex items-center justify-between py-5 px-1 border-b border-border-light">
            {title && (
              <h3 className="text-base font-bold text-white">{title}</h3>
            )}

            <div className={cn("flex items-center gap-3", !title && "ml-auto")}>
              {showSearch && (
                <div className="relative w-[237px]">
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[rgba(254,254,254,0.10)]">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-5 py-4 text-left text-xs font-medium text-white",
                      column.className,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.length > 0 ? (
                displayData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border-light last:border-0 rounded-lg"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn("px-5 py-4", column.className)}
                      >
                        {column.render(item)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 py-8 text-center text-white-secondary"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
