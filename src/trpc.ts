import { createTRPCReact, httpLink } from "@trpc/react-query";

import { appRouter } from "./services/dashboard-api/app/composition-root";

export const trpc = createTRPCReact<typeof appRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});
