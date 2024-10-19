import { describe, expect, it } from "vitest";

import { DashboardApi } from "./dashboard-api";
import { AuthenticatedUser, User } from "./schemas";

import {
  ControlAuthenticatorStubAdapter,
  RepoQuerierStubAdapter,
} from "../adapters/drivens";

// GIVEN
const userMock: User = {
  name: "John Doe",
  password: "password",
  email: "john.doe@gmail.com",
};
const expectedResult: AuthenticatedUser = {
  id: "1",
  token: "token",
  refreshToken: "refreshToken",
  name: userMock.name,
  email: userMock.email,
  permissions: {
    admin: true,
    user: true,
  },
};

describe("DashboardApi", () => {
  // SETUP
  const controlAuthenticatorStubAdapter = new ControlAuthenticatorStubAdapter();
  const repoQuerierStubAdapter = new RepoQuerierStubAdapter();

  const dashboardApi = new DashboardApi(
    controlAuthenticatorStubAdapter,
    repoQuerierStubAdapter
  );

  it.concurrent("should login", async () => {
    // WHEN
    const result = await dashboardApi.login(
      expectedResult.email,
      userMock.password
    );

    // THEN
    expect(result).toEqual(expectedResult);
  });

  it.concurrent("should register", async () => {
    // WHEN
    const result = await dashboardApi.register(userMock);

    // THEN
    expect(result).toEqual(expectedResult);
  });
});
