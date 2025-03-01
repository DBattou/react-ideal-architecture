"use client";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ReactQueryProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  // eslint-disable-next-line react/hook-use-state
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: process.env.NEXT_PUBLIC_ENV === "test" ? false : 3,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
