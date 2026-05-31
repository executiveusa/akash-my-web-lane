"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const middleware_1 = require("@repo/auth/middleware");
const middleware_2 = require("@repo/security/middleware");
const env_1 = require("./env");
const securityHeaders = env_1.env.FLAGS_SECRET
    ? (0, middleware_2.securityMiddleware)(middleware_2.noseconeOptionsWithToolbar)
    : (0, middleware_2.securityMiddleware)(middleware_2.noseconeOptions);
// Clerk middleware wraps other middleware in its callback
// For apps using Clerk, compose middleware inside authMiddleware callback
// For apps without Clerk, use createNEMO for composition (see apps/web)
exports.default = (0, middleware_1.authMiddleware)(() => securityHeaders());
exports.config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
    runtime: "nodejs",
};
