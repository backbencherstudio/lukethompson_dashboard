import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setLoading,
  setCredentials,
  setError,
  clearError,
  setEmailForReset,
  logout as logoutAction,
} from "@/lib/redux/slices/authSlice";
import { authApi } from "@/lib/api/auth.api";
import {
  LoginCredentials,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
} from "@/types";
import { ROUTES } from "@/constants";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, error, user, emailForReset } =
    useAppSelector((state) => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const response = await authApi.login(credentials);
        dispatch(setCredentials(response));

        // SET COOKIES HERE - AFTER SUCCESSFUL LOGIN
        if (typeof window !== "undefined") {
          document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400`;
          document.cookie = `refreshToken=${response.refreshToken}; path=/; max-age=604800`;
        }

        toast.success("Login successful!");
        router.refresh();
        router.push(ROUTES.DASHBOARD);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        dispatch(setError(message));
        toast.error(message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router],
  );

  const forgotPassword = useCallback(
    async (data: ForgotPasswordRequest) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const response = await authApi.forgotPassword(data);
        dispatch(setEmailForReset(data.email));

        // Optionally set email in cookie for server-side access
        if (typeof window !== "undefined") {
          document.cookie = `emailForReset=${data.email}; path=/; max-age=600`;
        }

        toast.success(response.message);
        router.push(ROUTES.VERIFY_OTP);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to send OTP";
        dispatch(setError(message));
        toast.error(message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router],
  );

  const verifyOTP = useCallback(
    async (data: VerifyOTPRequest) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const response = await authApi.verifyOTP(data);

        toast.success(response.message);
        router.push(ROUTES.RESET_PASSWORD);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid OTP";
        dispatch(setError(message));
        toast.error(message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router],
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const response = await authApi.resetPassword(data);

        // Clear the email cookie after password reset
        if (typeof window !== "undefined") {
          document.cookie = "emailForReset=; path=/; max-age=0";
        }

        toast.success(response.message);
        router.push(ROUTES.SUCCESS);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to reset password";
        dispatch(setError(message));
        toast.error(message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      dispatch(logoutAction());

      // CLEAR COOKIES ON LOGOUT
      if (typeof window !== "undefined") {
        document.cookie = "accessToken=; path=/; max-age=0";
        document.cookie = "refreshToken=; path=/; max-age=0";
        document.cookie = "emailForReset=; path=/; max-age=0";
      }

      // FORCE FULL RELOAD ON LOGOUT TO ENSURE CLEAN STATE
      if (typeof window !== "undefined") {
        window.location.href = ROUTES.LOGIN;
      } else {
        router.push(ROUTES.LOGIN);
      }
      toast.success("Logged out successfully");
    } catch (err) {
      dispatch(logoutAction());

      // Still clear cookies even if API fails
      if (typeof window !== "undefined") {
        document.cookie = "accessToken=; path=/; max-age=0";
        document.cookie = "refreshToken=; path=/; max-age=0";
        window.location.href = ROUTES.LOGIN;
      } else {
        router.push(ROUTES.LOGIN);
      }
    }
  }, [dispatch, router]);

  return {
    isAuthenticated,
    isLoading,
    error,
    user,
    emailForReset,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    logout,
  };
};
