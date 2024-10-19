import { type PropsWithChildren, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { trpc, trpcClient } from "../trpc";

type TRPCProviderProps = PropsWithChildren;
export function TRPCProvider({ children }: TRPCProviderProps) {
  const [trpcClientInstance] = useState(() => trpcClient);

  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  return (
    <trpc.Provider
      client={trpcClientInstance}
      queryClient={queryClientRef.current}
    >
      <QueryClientProvider client={queryClientRef.current}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
