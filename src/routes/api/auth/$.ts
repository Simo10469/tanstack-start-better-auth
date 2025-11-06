import { createFileRoute } from "@tanstack/react-router";

import { getAuth } from "@/lib/auth";

const auth = getAuth();

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET({ request }) {
        return auth.handler(request);
      },
      POST({ request }) {
        return auth.handler(request);
      },
      PUT({ request }) {
        return auth.handler(request);
      },
      DELETE({ request }) {
        return auth.handler(request);
      },
    },
  },
});
