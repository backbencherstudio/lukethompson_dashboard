import { User, AuthResponse } from "@/types";

export const MOCK_USER: User = {
  id: "1",
  email: "admin@detentionpay.com",
  name: "Admin User",
  role: "admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_TOKENS = {
  accessToken: "mock_access_token_" + Date.now(),
  refreshToken: "mock_refresh_token_" + Date.now(),
};

// Mock credentials for testing
export const MOCK_CREDENTIALS = {
  email: "admin@detentionpay.com",
  password: "Admin@123",
};

// Mock OTP for testing
export const MOCK_OTP = "123456";

// Mock delay to simulate API call
const mockDelay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  await mockDelay();

  if (
    email === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  ) {
    return {
      user: MOCK_USER,
      accessToken: MOCK_TOKENS.accessToken,
      refreshToken: MOCK_TOKENS.refreshToken,
    };
  }

  throw new Error("Invalid email or password");
};

export const mockForgotPassword = async (
  email: string,
): Promise<{ message: string }> => {
  await mockDelay();

  if (email === MOCK_CREDENTIALS.email) {
    return { message: "OTP sent successfully to your email" };
  }

  throw new Error("Email not found");
};

export const mockVerifyOTP = async (
  email: string,
  otp: string,
): Promise<{ message: string }> => {
  await mockDelay();

  if (otp === MOCK_OTP) {
    return { message: "OTP verified successfully" };
  }

  throw new Error("Invalid OTP");
};

export const mockResetPassword = async (
  email: string,
  password: string,
): Promise<{ message: string }> => {
  await mockDelay();

  return { message: "Password reset successfully" };
};
