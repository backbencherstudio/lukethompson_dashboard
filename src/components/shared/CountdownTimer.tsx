"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete?: () => void;
  onResend?: () => void;
  className?: string;
  resendText?: string;
  timerText?: string;
}

export const CountdownTimer = ({
  initialSeconds,
  onComplete,
  onResend,
  className,
  resendText = "Resend Code",
  timerText = "Resend Code",
}: CountdownTimerProps) => {
  const {  isActive, start, formattedTime } = useCountdown(
    initialSeconds,
    onComplete,
  );

  const handleResend = () => {
    start();
    onResend?.();
  };

  return (
    <div className={cn("text-sm font-bold", className)}>
      <span className="text-white-secondary">Didn`t receive the code? </span>
      {isActive ? (
        <span className="text-white-secondary">
          {timerText} ({formattedTime})
        </span>
      ) : (
        <button
          onClick={handleResend}
          className="text-green-success underline hover:text-green-success/80 transition-colors"
        >
          {resendText}
        </button>
      )}
    </div>
  );
};
