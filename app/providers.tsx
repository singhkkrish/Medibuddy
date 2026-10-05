"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * TanStack Query provider (the assignment's optional bonus). Used on the
 * homepage for search: it gives us request de-duplication, in-memory
 * caching per search term, and built-in loading/error state instead of
 * hand-rolled useState juggling for each.
 *
 * The QueryClient is created inside useState so each browser session gets
 * its own instance instead of a module-level singleton shared across
 * requests (important once this runs with the app router's server
 * rendering — a shared client would leak cached data between users).
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // openFDA label data doesn't change minute to minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
