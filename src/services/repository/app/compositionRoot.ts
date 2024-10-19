import { Repository } from "./repository";
import { MonitoringStubAdapter } from "../adapters/drivens";
import { UserManagerProxy } from "../adapters/drivers";

const compositionMock = () => {
  const logger = new MonitoringStubAdapter();
  const repositoryMock = new Repository(logger);
  const userManagerProxy = new UserManagerProxy(repositoryMock);

  return { userManagerProxy };
};

export const { userManagerProxy } = compositionMock();
