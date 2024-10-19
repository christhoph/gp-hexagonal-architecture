import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

import { appRouter } from "./app/composition-root";

// created for each request
const createContext = () => ({});

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
