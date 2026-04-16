"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {/* Previous Button - Left Side */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex p-2 items-center justify-center rounded-lg border transition-all duration-200",
          currentPage === 1
            ? "cursor-not-allowed border-border-light text-white-secondary opacity-50"
            : "border-green-success text-white hover:bg-green-success hover:text-black",
        )}
        aria-label="Previous page"
      >
        <div className="flex items-center gap-1">
          <ChevronLeft size={18} />
          <span>Previous</span>
        </div>
      </button>

      {/* Page Numbers - Center */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-white-secondary"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
                currentPage === page
                  ? "bg-green-success text-black"
                  : "text-white-secondary hover:bg-white/10 hover:text-white",
              )}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next Button - Right Side */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex p-2 items-center justify-center rounded-lg border transition-all duration-200",
          currentPage === totalPages
            ? "cursor-not-allowed border-border-light text-white-secondary opacity-50"
            : "border-green-success text-white hover:bg-green-success hover:text-black",
        )}
        aria-label="Next page"
      >
        <div className="flex items-center gap-1">
          <span>Next</span>
          <ChevronRight size={18} />
        </div>
      </button>
    </div>
  );
};
