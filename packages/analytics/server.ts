import "server-only";
import { PostHog } from "posthog-node";
import { keys } from "./keys";

const config = keys();

export const analytics = config.NEXT_PUBLIC_POSTHOG_KEY
  ? new PostHog(config.NEXT_PUBLIC_POSTHOG_KEY, {
      host: config.NEXT_PUBLIC_POSTHOG_HOST,

      // Don't batch events and flush immediately - we're running in a serverless environment
      flushAt: 1,
      flushInterval: 0,
    })
  : null;
