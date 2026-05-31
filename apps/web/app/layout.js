"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const LLMProxyToggle_1 = __importDefault(require("../components/LLMProxyToggle"));
const google_1 = require("next/font/google");
require("./globals.css");
const geist = (0, google_1.Geist)({ subsets: ["latin"] });
const geistMono = (0, google_1.Geist_Mono)({ subsets: ["latin"] });
exports.metadata = {
    title: "Akash - WordPress to Astro Migration",
    description: "Convert your WordPress site to lightning-fast Astro with AI-powered Synthia",
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={geist.className}>
        {children}
        <LLMProxyToggle_1.default />
      </body>
    </html>);
}
