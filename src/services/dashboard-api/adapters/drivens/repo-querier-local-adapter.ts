import { User } from "../../app/schemas";
import { ForRepoQuerying } from "../../ports/drivens";
import { ExternalUser } from "../../../repository/app/schemas";
import { userManagerProxy } from "../../../repository/app/compositionRoot";

export class RepoQuerierLocalAdapter implements ForRepoQuerying {
  async getUser(email: string): Promise<ExternalUser> {
    return await userManagerProxy.getUser(email);
  }

  async createUser(user: User): Promise<ExternalUser> {
    return await userManagerProxy.createUser(user);
  }
}
