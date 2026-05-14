import posthog from "posthog-js";
import { keys } from "./keys";

export const initializeAnalytics = () => {
  const config = keys();
  if (config.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(config.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: config.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2025-05-24",
    });
  }
};
