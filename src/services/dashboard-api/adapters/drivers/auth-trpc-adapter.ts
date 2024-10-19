import { initTRPC } from "@trpc/server";
import { DashboardApi } from "../../app/dashboard-api";
import { AuthenticatedUserSchema, UserSchema } from "../../app/schemas";

export function authTRPCAdapter(
  dashboardApi: DashboardApi,
  t: ReturnType<typeof initTRPC.create>
) {
  return t.router({
    login: t.procedure
      .input(UserSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.login(input.email, input.password)),
    register: t.procedure
      .input(UserSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.register(input)),
  });
}
