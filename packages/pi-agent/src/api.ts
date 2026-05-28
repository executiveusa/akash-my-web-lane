// src/api.ts – JSON‑RPC entry point for the Pi agent
import { createServer } from "http";
import { config } from "dotenv";
import { Pi } from "@earendil/pi"; // hypothetical SDK
import { startMigration, getJobStatus, setCustomDomain, listClientSites } from "../../packages/cms/emdash-deployer";

config();

const TOKEN = process.env.PI_AGENT_TOKEN ?? "";

if (!TOKEN) {
  console.error("PI_AGENT_TOKEN missing");
  process.exit(1);
}

interface RpcRequest {
  jsonrpc: "2.0";
  id: number | string;
  method: string;
  params?: any;
}

interface RpcResponse {
  jsonrpc: "2.0";
  id: number | string;
  result?: any;
  error?: { code: number; message: string };
}

const server = createServer(async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
    return;
  }
  const auth = req.headers["authorization"];
  if (!auth || auth !== `Bearer ${TOKEN}`) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: { code: -32600, message: "Invalid token" } }));
    return;
  }
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  let request: RpcRequest;
  try {
    request = JSON.parse(body);
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { code: -32700, message: "Parse error" } }));
    return;
  }
  const { method, params, id } = request;
  const response: RpcResponse = { jsonrpc: "2.0", id };
  try {
    switch (method) {
      case "migrate":
        response.result = await startMigration(params);
        break;
      case "status":
        response.result = await getJobStatus(params.jobId);
        break;
      case "setDomain":
        await setCustomDomain(params.projectName, params.domain);
        response.result = { success: true };
        break;
      case "listSites":
        response.result = await listClientSites();
        break;
      default:
        response.error = { code: -32601, message: "Method not found" };
    }
  } catch (e: any) {
    response.error = { code: -32000, message: e.message };
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
});

const PORT = process.env.PORT ?? "4000";
server.listen(Number(PORT), () => {
  console.log(`Pi agent listening on port ${PORT}`);
});
