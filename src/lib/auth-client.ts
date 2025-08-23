import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";
import { adminClient } from "better-auth/client/plugins";
import {
  inferAdditionalFields,
  magicLinkClient,
} from "better-auth/client/plugins";
import { ac, roles } from "./permission";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles }),
    magicLinkClient(),
  ],
});
