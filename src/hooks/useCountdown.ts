import { useState, useEffect, useCallback, useRef } from "react";

export const useCountdown = (
  initialSeconds: number,
  onComplete?: () => void,
) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearIntervalRef = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    clearIntervalRef();
    setSeconds(initialSeconds);
    setIsActive(false);
  }, [initialSeconds, clearIntervalRef]);

  const stop = useCallback(() => {
    clearIntervalRef();
    setIsActive(false);
  }, [clearIntervalRef]);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev - 1;
          if (newSeconds === 0) {
            setIsActive(false);
            onCompleteRef.current?.();
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      clearIntervalRef();
    };
  }, [isActive, seconds, clearIntervalRef]);

  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return {
    seconds,
    isActive,
    start,
    reset,
    stop,
    formattedTime,
  };
};
