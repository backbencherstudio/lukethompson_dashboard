import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  icon,
  className,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl bg-form-bg p-5 border border-border-light",
        "flex-1",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 shadow-[0_0_4px_0_rgba(0,0,0,0.05)]">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal text-white-secondary">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};
