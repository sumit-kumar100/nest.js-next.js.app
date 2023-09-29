"use client";

import * as React from "react";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
}
