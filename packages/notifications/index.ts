import { Knock } from "@knocklabs/node";
import { keys } from "./keys";

const key = keys().KNOCK_SECRET_API_KEY;

// Lazy initialization or dummy key for build time
export const notifications = key 
  ? new Knock(key as any) 
  : ({
      notify: async () => ({}),
      users: {
        identify: async () => ({}),
      }
    } as any);

export * from "./whatsapp";
