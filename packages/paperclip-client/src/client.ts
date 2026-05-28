// src/client.ts – thin wrapper around Paperclip LLM API
import axios from "axios";

/**
 * Sends a natural‑language command to Paperclip and expects a structured JSON
 * response that the Pi agent can understand.
 *
 * The Paperclip endpoint expects a POST with `{prompt:string}` and returns a
 * `{result:any}` payload. Adjust the request/response shape if the real API
 * differs.
 */
export async function interpretCommand(prompt: string): Promise<any> {
  const apiKey = process.env.PAPERCLIP_API_KEY;
  if (!apiKey) {
    throw new Error("PAPERCLIP_API_KEY missing in environment");
  }

  const response = await axios.post(
    "https://api.paperclip.ai/v1/interpret", // hypothetical endpoint
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Assume the service returns { result: { action: string, params: any } }
  return response.data.result;
}
