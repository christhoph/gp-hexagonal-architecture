import { AuthenticatedUser, User } from "./schemas";
import { ForAuthenticating } from "../ports/drivers";
import { ForControlAuthenticating, ForRepoQuerying } from "../ports/drivens";

export class DashboardApi implements ForAuthenticating {
  constructor(
    private readonly controlAuthenticator: ForControlAuthenticating,
    private readonly repoQuerier: ForRepoQuerying
  ) {}

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const authDetails = await this.controlAuthenticator.getAuthDetails(
      email,
      password
    );
    const permissions = await this.controlAuthenticator.getPermissions(
      email,
      password
    );
    const user = await this.repoQuerier.getUser(email);

    const response = {
      ...user,
      ...authDetails,
      permissions,
    };

    return response;
  }

  async register(user: User): Promise<AuthenticatedUser> {
    const newUser = await this.repoQuerier.createUser(user);
    const authDetails = await this.controlAuthenticator.getAuthDetails(
      user.email,
      user.password
    );
    const permissions = await this.controlAuthenticator.getPermissions(
      user.email,
      user.password
    );

    const response = {
      ...newUser,
      ...authDetails,
      permissions,
    };

    return response;
  }
}
