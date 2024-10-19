import { User } from "../../app/schemas";
import { ExternalUser } from "../../../repository/app/schemas";

export interface ForRepoQuerying {
  getUser(email: string): Promise<ExternalUser>;
  createUser(user: User): Promise<ExternalUser>;
}
