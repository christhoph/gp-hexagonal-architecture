import { ExternalUser, User } from "../../app/schemas";

export interface ForManagingUser {
  getUser(email: string): Promise<ExternalUser>;
  createUser(user: User): Promise<ExternalUser>;
}
