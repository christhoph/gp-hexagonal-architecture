import { User } from "../../app/schemas";
import { ForRepoQuerying } from "../../ports/drivens";
import { ExternalUser } from "../../../repository/app/schemas";

const externalUserMock: ExternalUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@gmail.com",
};

export class RepoQuerierStubAdapter implements ForRepoQuerying {
  getUser(_email: string): Promise<ExternalUser> {
    return Promise.resolve(externalUserMock);
  }

  createUser(user: User): Promise<ExternalUser> {
    return Promise.resolve({ ...externalUserMock, ...user });
  }
}
