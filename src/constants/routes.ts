export const ROUTES = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",
  SUCCESS: "/success",
  DASHBOARD: "/dashboard",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.VERIFY_OTP,
  ROUTES.RESET_PASSWORD,
  ROUTES.SUCCESS,
] as const;

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD] as const;
