"use server";

import { resend } from "@repo/email";
import { ContactTemplate } from "@repo/email/templates/contact";
import { parseError } from "@repo/observability/error";
import { headers } from "next/headers";

const RESEND_FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";

export const contact = async (
  name: string,
  email: string,
  message: string
): Promise<{
  error?: string;
}> => {
  try {
    // Rate limiting is optional - only if Upstash is configured
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { createRateLimiter, slidingWindow } = await import("@repo/rate-limit");
      const rateLimiter = createRateLimiter({
        limiter: slidingWindow(1, "1d"),
      });
      const head = await headers();
      const ip = head.get("x-forwarded-for");

      const { success } = await rateLimiter.limit(`contact_form_${ip}`);

      if (!success) {
        throw new Error(
          "You have reached your request limit. Please try again later."
        );
      }
    }

    await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_FROM,
      subject: "Contact form submission",
      replyTo: email,
      react: <ContactTemplate email={email} message={message} name={name} />,
    });

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
