import { initTRPC } from "@trpc/server";

import { DashboardApi } from "./dashboard-api";
import {
  ControlAuthenticatorStubAdapter,
  RepoQuerierStubAdapter,
} from "../adapters/drivens";
import {
  AuthenticatorProxyAdapter,
  authTRPCAdapter,
} from "../adapters/drivers";
import { RepoQuerierLocalAdapter } from "../adapters/drivens/repo-querier-local-adapter";

const compositionMock = () => {
  // DRIVENS
  const controlAuthenticatorStubAdapter = new ControlAuthenticatorStubAdapter();
  const repoQuerierStubAdapter = new RepoQuerierStubAdapter();

  // APP
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStubAdapter,
    repoQuerierStubAdapter
  );

  // DRIVERS
  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(
    dashboardApiMock
  );

  return { authenticatorProxyAdapter };
};

export const { authenticatorProxyAdapter } = compositionMock();

export const localTRPCComponse = () => {
  // DRIVENS
  const controlAuthenticatorStubAdapter = new ControlAuthenticatorStubAdapter();
  const repoQuerierLocalAdapter = new RepoQuerierLocalAdapter();

  // APP
  const dashboardApiMock = new DashboardApi(
    controlAuthenticatorStubAdapter,
    repoQuerierLocalAdapter
  );

  // TRPC INSTANCE
  const t = initTRPC.create();

  // TRPC DRIVER
  const authTRPCAdapterRouter = authTRPCAdapter(dashboardApiMock, t);

  const appRouter = t.mergeRouters(authTRPCAdapterRouter);

  return { appRouter };
};

export const { appRouter } = localTRPCComponse();
