import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { bearer } from "better-auth/plugins/bearer";

import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { db } from "@/db";
import * as schema from "@/db/schema";

export const getAuth = createServerOnlyFn(() =>
  betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),

    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },

    basePath: process.env.BETTER_AUTH_BASE_PATH,
    baseURL: process.env.BETTER_AUTH_BASE_URL,

    trustedOrigins:
      process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : [],

    advanced: {
      cookiePrefix: process.env.BETTER_AUTH_SESSION_PREFIX,
    },

    // enable bearer if you want to support non-cookie auth flow
    // plugins: [bearer()],
  }),
);

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getRequest();

    const session = await getAuth().api.getSession(request);

    if (!session || !session.user) {
      return null;
    }

    return session.user;
  },
);
