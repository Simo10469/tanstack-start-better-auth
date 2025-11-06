import { getCurrentUser } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  async beforeLoad() {
    const user = await getCurrentUser();

    if (!user) {
      throw redirect({ to: "/sign-in" });
    }

    return { user };
  },
});
