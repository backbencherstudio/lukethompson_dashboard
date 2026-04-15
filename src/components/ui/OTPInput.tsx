"use client";

import {
  useRef,
  useState,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
  useId,
} from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  autoFocus?: boolean;
}

export const OTPInput = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
  success,
  autoFocus = true,
}: OTPInputProps) => {
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const componentId = useId();

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const getOTPValue = () => (value ? value.toString().split("") : []);

  const isInputValueValid = (character: string) => {
    return /^\d*$/.test(character);
  };

  const handleOtpChange = (otp: string[]) => {
    const otpValue = otp.join("");
    onChange(otpValue);
  };

  const changeCodeAtFocus = (character: string) => {
    const otp = getOTPValue();
    otp[activeInput] = character;
    handleOtpChange(otp);
  };

  const focusInput = (index: number) => {
    const activeInputIndex = Math.max(Math.min(length - 1, index), 0);
    setActiveInput(activeInputIndex);
    inputRefs.current[activeInputIndex]?.focus();
  };

  const focusNextInput = () => {
    focusInput(activeInput + 1);
  };

  const focusPrevInput = () => {
    focusInput(activeInput - 1);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const character = event.currentTarget.value;
    if (!isInputValueValid(character)) {
      return;
    }
    changeCodeAtFocus(character);
    if (character) {
      focusNextInput();
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      const otp = getOTPValue();
      if (otp[activeInput]) {
        changeCodeAtFocus("");
      } else {
        focusPrevInput();
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusPrevInput();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusNextInput();
    } else if (
      event.key === " " ||
      event.key === "Spacebar" ||
      event.key === "Space"
    ) {
      event.preventDefault();
    }
  };

  const handleOnPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Get pasted data and clean it
    const pastedData = event.clipboardData
      .getData("text/plain")
      .trim()
      .replace(/\D/g, "") // Remove all non-numeric characters
      .slice(0, length); // Only take up to the length needed

    if (pastedData.length === 0) return;

    // Create new OTP array
    const otp = getOTPValue();
    const pastedChars = pastedData.split("");

    // Fill in the OTP array with pasted characters
    for (let i = 0; i < length; i++) {
      if (i < pastedChars.length) {
        otp[i] = pastedChars[i];
      } else {
        otp[i] = otp[i] || "";
      }
    }

    // Update OTP value
    handleOtpChange(otp);

    // Focus the next empty input or the last input
    const nextFocusIndex = Math.min(pastedChars.length, length - 1);
    setTimeout(() => {
      focusInput(nextFocusIndex);
    }, 0);
  };

  const handleOnFocus = (index: number) => () => {
    setActiveInput(index);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {Array.from({ length }, (_, index) => {
          const otp = getOTPValue();
          const isFilled = index < otp.length && otp[index] !== "";
          const isActive = activeInput === index;

          return (
            <input
              key={`${componentId}-${index}`}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={otp[index] || ""}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onPaste={handleOnPaste}
              onFocus={handleOnFocus(index)}
              disabled={disabled}
              className={cn(
                "h-[50px] w-[50px] rounded-[10px] border bg-white/10 text-center text-2xl font-bold text-white",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-green-success",
                "disabled:cursor-not-allowed disabled:opacity-50",
                isFilled || isActive
                  ? "border-green-success"
                  : "border-border-medium",
                error && "border-error-red focus:ring-error-red",
              )}
              aria-label={`Digit ${index + 1} of ${length}`}
            />
          );
        })}
      </div>
      {error && (
        <p className="text-center text-xs text-error-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
