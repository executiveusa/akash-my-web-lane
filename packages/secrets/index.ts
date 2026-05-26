import { InfisicalSDK } from "@infisical/sdk";

let client: InfisicalSDK | null = null;
let isAuthenticated = false;

export async function getSecret(key: string): Promise<string> {
  if (!process.env.INFISICAL_CLIENT_ID || !process.env.INFISICAL_CLIENT_SECRET) {
    // Fallback for development if Infisical is not yet configured
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
      console.error("Failed to authenticate with Infisical", error);
      return process.env[key] || "";
    }
  }
  
  try {
    const secret = await client.secrets().getSecret({
      secretName: key,
      projectId: process.env.INFISICAL_PROJECT_ID!,
      environment: process.env.NODE_ENV === "production" ? "prod" : "dev",
    });
    
    return secret.secretValue;
  } catch (error) {
    // Fallback to env if secret not found or error
    return process.env[key] || "";
  }
}
