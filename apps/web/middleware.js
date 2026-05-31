"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const middleware_1 = require("@repo/auth/middleware");
const middleware_2 = require("@repo/internationalization/middleware");
const error_1 = require("@repo/observability/error");
const security_1 = require("@repo/security");
const middleware_3 = require("@repo/security/middleware");
const nemo_1 = require("@rescale/nemo");
const server_1 = require("next/server");
const env_1 = require("@/env");
exports.config = {
    // matcher tells Next.js which routes to run the middleware on. This runs the
    // middleware on all routes except for static assets and Posthog ingest
    matcher: ["/((?!_next/static|_next/image|ingest|favicon.ico).*)"],
    runtime: "nodejs",
};
const securityHeaders = env_1.env.FLAGS_SECRET
    ? (0, middleware_3.securityMiddleware)(middleware_3.noseconeOptionsWithToolbar)
    : (0, middleware_3.securityMiddleware)(middleware_3.noseconeOptions);
// Custom middleware for Arcjet security checks
const arcjetMiddleware = async (request) => {
    if (!env_1.env.ARCJET_KEY) {
        return;
    }
    try {
        await (0, security_1.secure)([
            // See https://docs.arcjet.com/bot-protection/identifying-bots
            "CATEGORY:SEARCH_ENGINE", // Allow search engines
            "CATEGORY:PREVIEW", // Allow preview links to show OG images
            "CATEGORY:MONITOR", // Allow uptime monitoring services
        ], request);
    }
    catch (error) {
        const message = (0, error_1.parseError)(error);
        return server_1.NextResponse.json({ error: message }, { status: 403 });
    }
};
// Compose non-Clerk middleware with Nemo
const composedMiddleware = (0, nemo_1.createNEMO)({}, {
    before: [middleware_2.internationalizationMiddleware, arcjetMiddleware],
});
// Clerk middleware wraps other middleware in its callback
exports.default = (0, middleware_1.authMiddleware)(async (_auth, request, event) => {
    // Run security headers first
    const headersResponse = securityHeaders();
    // Then run composed middleware (i18n + arcjet)
    const middlewareResponse = await composedMiddleware(request, event);
    // Return middleware response if it exists, otherwise headers response
    return middlewareResponse || headersResponse;
});
