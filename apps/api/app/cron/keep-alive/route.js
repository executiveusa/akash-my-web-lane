"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async () => {
    // Cron job keep-alive endpoint
    // This endpoint keeps the service alive during idle periods
    return new Response("OK", { status: 200 });
};
exports.GET = GET;
