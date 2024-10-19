export interface User {
  name: string;
  email: string;
  password: string;
}

export interface ExternalUser extends Omit<User, "password"> {
  id: string;
}
