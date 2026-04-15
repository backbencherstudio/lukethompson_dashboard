import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const maskEmail = (email: string): string => {
  const [username, domain] = email.split("@");
  if (username.length <= 2) {
    return `${username.charAt(0)}****@${domain}`;
  }
  const maskedUsername =
    username.charAt(0) +
    "*".repeat(username.length - 2) +
    username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};

export const validatePassword = (password: string) => {
  return {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const isStrongPassword = (password: string): boolean => {
  const validation = validatePassword(password);
  return Object.values(validation).every(Boolean);
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
