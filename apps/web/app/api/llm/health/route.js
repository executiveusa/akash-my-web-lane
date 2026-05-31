"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
async function GET() {
    // Simple health check endpoint
    return server_1.NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
