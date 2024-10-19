import { describe, expect, it } from "vitest";

import { Repository } from "./repository";
import { ExternalUser, User } from "./schemas";

import { MonitoringStubAdapter } from "../adapters/drivens";

// GIVEN
const userMock: User = {
  name: "John Doe",
  password: "password",
  email: "john.doe@gmail.com",
};
const expectedResult: ExternalUser = {
  id: "1",
  name: userMock.name,
  email: userMock.email,
};

describe("Repository", () => {
  // SETUP
  const logger = new MonitoringStubAdapter();
  const repositoryMock = new Repository(logger);

  it.concurrent("should control that the user does not exist", () => {
    // WHEN
    const getUserPromise = repositoryMock.getUser(userMock.email);

    // THEN
    expect(getUserPromise).rejects.toThrowError("User not found");
  });

  it.concurrent("should create new user", async () => {
    // WHEN
    const result = await repositoryMock.createUser(userMock);

    // THEN
    expect(result).toEqual(expectedResult);
  });

  it.concurrent("should control that the user already exists", () => {
    // WHEN
    const createUserPromise = repositoryMock.createUser(userMock);

    // THEN
    expect(createUserPromise).rejects.toThrowError("User already exists");
  });

  it.concurrent("should get user", async () => {
    // WHEN
    const result = await repositoryMock.getUser(userMock.email);

    // THEN
    expect(result).toEqual(expectedResult);
  });
});
