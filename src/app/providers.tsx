"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "@/lib/redux/store";
import { useState } from "react";
import { LoadingPage } from "@/components/shared/LoadingPage";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#111926",
                color: "#fff",
                border: "1px solid rgba(254, 254, 254, 0.10)",
              },
              success: {
                iconTheme: {
                  primary: "#33D17A",
                  secondary: "#fff",
                },
                style: {
                  background: "#111926",
                  color: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#DF1C41",
                  secondary: "#fff",
                },
                style: {
                  background: "#111926",
                  color: "#fff",
                },
              },
            }}
          />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
