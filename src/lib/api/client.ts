import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { APP_CONFIG, STORAGE_KEYS } from "@/constants";
import { store } from "@/lib/redux/store";
import { logout, setCredentials } from "@/lib/redux/slices/authSlice";

const apiClient = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          // Attempt to refresh token
          const response = await axios.post(
            `${APP_CONFIG.apiUrl}/auth/refresh`,
            {
              refreshToken,
            },
          );

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;

          // Update store with new tokens
          store.dispatch(
            setCredentials({
              user: state.auth.user!,
              accessToken,
              refreshToken: newRefreshToken,
            }),
          );

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
