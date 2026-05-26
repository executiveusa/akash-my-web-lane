import { InfisicalSDK } from "@infisical/sdk";
import { log } from "@repo/observability/log";

let client: InfisicalSDK | null = null;
let isAuthenticated = false;

export async function getSecret(key: string): Promise<string> {
  if (!process.env.INFISICAL_CLIENT_ID || !process.env.INFISICAL_CLIENT_SECRET) {
    // Fallback for development if Infisical is not yet configured
    return process.env[key] || "";
  }

  if (!process.env.INFISICAL_PROJECT_ID) {
    log.error("Infisical project ID not configured", { key });
    return process.env[key] || "";
  }

  if (!client) {
    client = new InfisicalSDK();
  }

  if (!isAuthenticated) {
    try {
      await client.auth().universalAuth.login({
        clientId: process.env.INFISICAL_CLIENT_ID,
        clientSecret: process.env.INFISICAL_CLIENT_SECRET,
      });
      isAuthenticated = true;
    } catch (error) {
      log.error("Failed to authenticate with Infisical", { error });
      return process.env[key] || "";
    }
  }

  try {
    const secret = await client.secrets().getSecret({
      secretName: key,
      projectId: process.env.INFISICAL_PROJECT_ID,
      environment: process.env.NODE_ENV === "production" ? "prod" : "dev",
    });

    return secret.secretValue;
  } catch (error) {
    log.error("Failed to fetch secret from Infisical", { key, error });
    return process.env[key] || "";
  }
}
