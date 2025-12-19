"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

type QueryProviderProps = {
  children: ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  // Important: useState to ensure QueryClient is created only on client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Global defaults - adjust as needed for your fleet app
            staleTime: 1000 * 60 * 5, // 1 minute - data fresh for 1 min
            gcTime: 1000 * 60 * 20, // 10 minutes cache (formerly cacheTime)
            retry: 2,
            refetchOnWindowFocus: false, // Good for dashboards/modals
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Optional: Remove in production or keep for debugging */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
