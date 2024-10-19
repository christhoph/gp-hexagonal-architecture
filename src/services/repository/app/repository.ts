import { ExternalUser, User } from "./schemas";

import { ForMonitoring } from "../ports/drivens";
import { ForManagingUser } from "../ports/drivers";

export class Repository implements ForManagingUser {
  private userList: ExternalUser[] = [];

  constructor(private readonly logger: ForMonitoring) {}

  private findUser(email: string) {
    const userExists = this.userList.find((_user) => _user.email === email);

    return userExists;
  }

  async getUser(email: string): Promise<ExternalUser> {
    const user = this.findUser(email);

    if (!user) {
      const errorMsg = "User not found";

      this.logger.log("GetUser", errorMsg);

      throw new Error(errorMsg);
    }

    this.logger.log("GetUser", `The user with email ${email} found`);

    return user;
  }

  async createUser(user: User): Promise<ExternalUser> {
    const userExists = Boolean(this.findUser(user.email));

    if (userExists) {
      const errorMsg = "User already exists";

      this.logger.log("CreateUser", errorMsg);

      throw new Error(errorMsg);
    }

    this.logger.log(
      "CreateUser",
      `The user with the email ${user.email} was created successfully`
    );

    const { password: _password, ...restUser } = user;

    const newUser = {
      ...restUser,
      id: `${this.userList.length + 1}`,
    };

    this.userList.push(newUser);

    return newUser;
  }
}
