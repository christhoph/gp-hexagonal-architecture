import { z } from "zod";

import { PermissionsSchema } from "./auth";

export const AuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email"),
  name: z.string(),
  token: z.string(),
  refreshToken: z.string(),
  permissions: PermissionsSchema,
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

export const UserSchema = z
  .object({
    password: z.string(),
  })
  .merge(AuthenticatedUserSchema.pick({ email: true, name: true }));

export type User = z.infer<typeof UserSchema>;
