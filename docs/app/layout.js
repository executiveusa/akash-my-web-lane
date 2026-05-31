"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./global.css");
const react_1 = require("@vercel/analytics/react");
const provider_1 = require("fumadocs-ui/provider");
const google_1 = require("next/font/google");
const utils_1 = require("@/lib/utils");
const sonner_1 = require("../components/ui/sonner");
const tooltip_1 = require("../components/ui/tooltip");
const theme_1 = require("./providers/theme");
const sans = (0, google_1.Geist)({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: "variable",
});
const mono = (0, google_1.Geist_Mono)({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: "variable",
});
const Layout = ({ children }) => (<html className={(0, utils_1.cn)("touch-manipulation scroll-smooth font-sans antialiased", sans.variable, mono.variable)} lang="en" suppressHydrationWarning>
    <body className="flex min-h-screen flex-col">
      <theme_1.ThemeProvider>
        <provider_1.RootProvider>
          <tooltip_1.TooltipProvider>{children}</tooltip_1.TooltipProvider>
        </provider_1.RootProvider>
        <react_1.Analytics />
      </theme_1.ThemeProvider>
      <sonner_1.Toaster />
    </body>
  </html>);
exports.default = Layout;
