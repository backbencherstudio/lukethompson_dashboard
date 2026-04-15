"use client";

interface PlanBreakdownItemProps {
  name: string;
  subscribers: number;
  color: string;
  percentage: number;
  total: number;
}

export const PlanBreakdownItem = ({
  name,
  subscribers,
  color,
  percentage,
  total,
}: PlanBreakdownItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-white-secondary">{name}</span>
        </div>
        <span className="text-sm font-medium" style={{ color }}>
          {subscribers}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};
