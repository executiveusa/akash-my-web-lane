"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("@/env");
require("./styles.css");
const provider_1 = require("@repo/analytics/provider");
const design_system_1 = require("@repo/design-system");
const fonts_1 = require("@repo/design-system/lib/fonts");
const toolbar_1 = require("@repo/feature-flags/components/toolbar");
const RootLayout = ({ children }) => (<html className={fonts_1.fonts} lang="en" suppressHydrationWarning>
    <body>
      <provider_1.AnalyticsProvider>
        <design_system_1.DesignSystemProvider helpUrl={env_1.env.NEXT_PUBLIC_DOCS_URL} privacyUrl={new URL("/legal/privacy", env_1.env.NEXT_PUBLIC_WEB_URL).toString()} termsUrl={new URL("/legal/terms", env_1.env.NEXT_PUBLIC_WEB_URL).toString()}>
          {children}
        </design_system_1.DesignSystemProvider>
      </provider_1.AnalyticsProvider>
      <toolbar_1.Toolbar />
    </body>
  </html>);
exports.default = RootLayout;
