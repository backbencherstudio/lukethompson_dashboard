"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Column } from "@/types/table.types";
import { cn } from "@/lib/utils";

interface MobileCardViewProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage: string;
}

export function MobileCardView<T extends { id: string }>({
  data,
  columns,
  emptyMessage,
}: MobileCardViewProps<T>) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (data.length === 0) {
    return (
      <div className="md:hidden py-12 text-center text-white-secondary">
        {emptyMessage}
      </div>
    );
  }

  // Filter out desktopOnly columns for mobile
  const cardColumns = columns.filter((col) => !col.desktopOnly);
  // Always show actions column on mobile if it exists
  const actionsColumn = cardColumns.find((col) => col.key === "actions");
  const regularColumns = cardColumns.filter((col) => col.key !== "actions");

  const mainColumns = regularColumns.slice(0, 2); // Show 2 main fields to save space
  const extraColumns = regularColumns.slice(2);

  return (
    <div className="md:hidden space-y-3 p-5">
      {data.map((item) => {
        const isExpanded = expandedCards.has(item.id);

        return (
          <div
            key={item.id}
            className="rounded-xl bg-form-bg border border-border-light overflow-hidden transition-all duration-200"
          >
            <div className="p-4 space-y-3">
              {mainColumns.map((column, index) => (
                <div
                  key={column.key}
                  className={cn(
                    "flex items-center gap-1",
                    index === 0 && "pb-2 border-b border-border-light",
                  )}
                >
                  <span className="text-xs font-medium text-white-secondary min-w-[40px]">
                    {column.header}
                  </span>
                  <div className="flex-1 text-sm text-white break-words">
                    {column.render(item)}
                  </div>
                </div>
              ))}

              {/* Show actions on mobile if exists */}
              {actionsColumn && (
                <div className="flex items-center justify-between gap-3 pt-2">
                  <span className="text-xs font-medium text-white-secondary min-w-[40px]">
                    {actionsColumn.header}
                  </span>
                  <div className="flex-1 text-sm text-white text-end">
                    {actionsColumn.render(item)}
                  </div>
                </div>
              )}
            </div>

            {extraColumns.length > 0 && (
              <>
                <button
                  onClick={() => toggleCard(item.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-medium text-white-secondary hover:text-white border-t border-border-light bg-white/5 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={14} />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} />
                      Show {extraColumns.length} More Fields
                    </>
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 space-y-3 border-t border-border-light bg-white/[0.02]">
                    {extraColumns.map((column) => (
                      <div
                        key={column.key}
                        className="flex items-center gap-3 pt-3"
                      >
                        <span className="text-xs font-medium text-white-secondary min-w-[40px]">
                          {column.header}
                        </span>
                        <div className="flex-1 text-sm text-white break-words">
                          {column.render(item)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
