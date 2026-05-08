import apiClient from "./client";
import {
  LoginCredentials,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
  AuthResponse,
  ApiResponse,
} from "@/types";
import {
  mockLogin,
  mockForgotPassword,
  mockVerifyOTP,
  mockResetPassword,
} from "./mock-data";

const USE_MOCK = true; // Toggle this to switch between mock and real API

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log("AuthAPI login call:", credentials);
    if (USE_MOCK) {
      return mockLogin(credentials.email, credentials.password);
    }


    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials,
    );
    return response.data.data!;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<{ message: string }> => {
    if (USE_MOCK) {
      return mockForgotPassword(data.email);
    }

    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/auth/forgot-password",
      data,
    );
    return response.data.data!;
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<{ message: string }> => {
    if (USE_MOCK) {
      return mockVerifyOTP(data.email, data.otp);
    }

    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/auth/verify-otp",
      data,
    );
    return response.data.data!;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<{ message: string }> => {
    if (USE_MOCK) {
      return mockResetPassword(data.email, data.password);
    }

    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      "/auth/reset-password",
      data,
    );
    return response.data.data!;
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK) {
      return;
    }

    await apiClient.post("/auth/logout");
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    if (USE_MOCK) {
      return {
        accessToken: "mock_access_token_" + Date.now(),
        refreshToken: "mock_refresh_token_" + Date.now(),
      };
    }

    const response = await apiClient.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >("/auth/refresh", {
      refreshToken,
    });
    return response.data.data!;
  },
};
