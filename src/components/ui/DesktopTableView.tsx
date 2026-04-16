"use client";

import { cn } from "@/lib/utils";
import { Column } from "@/types/table.types";

interface DesktopTableViewProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage: string;
}

export function DesktopTableView<T extends { id: string }>({
  data,
  columns,
  emptyMessage,
}: DesktopTableViewProps<T>) {
  const visibleColumns = columns.filter((col) => !col.mobileHidden);

  return (
    <div className="hidden md:block overflow-x-auto px-5">
      <table className="w-full">
        <thead>
          <tr>
            {visibleColumns.map((column, index) => (
              <th
                key={column.key}
                className={cn(
                  "bg-[rgba(254,254,254,0.10)] px-5 py-4 text-left text-xs font-medium text-white",
                  index === 0 && "rounded-l-2xl",
                  index === visibleColumns.length - 1 && "rounded-r-2xl",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border-light last:border-0"
              >
                {visibleColumns.map((column) => (
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
                colSpan={visibleColumns.length}
                className="px-5 py-12 text-center text-white-secondary"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
