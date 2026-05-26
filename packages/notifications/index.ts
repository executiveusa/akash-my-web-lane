import { Knock } from "@knocklabs/node";
import { keys } from "./keys";
import { log } from "@repo/observability/log";

const key = keys().KNOCK_SECRET_API_KEY;

if (!key) {
  log.warn("Knock API key not configured - notifications will not be sent in production");
}

// Lazy initialization or dummy key for build time
export const notifications = key
  ? new Knock(key as any)
  : ({
      notify: async () => {
        log.error("Notification suppressed: Knock API key not configured");
        return {};
      },
      users: {
        identify: async () => {
          log.error("User identification suppressed: Knock API key not configured");
          return {};
        },
      }
    } as any);

export * from "./whatsapp";
