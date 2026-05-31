"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMDXComponents = getMDXComponents;
const callout_1 = require("fumadocs-ui/components/callout");
const StepsComponents = __importStar(require("fumadocs-ui/components/steps"));
const TabsComponents = __importStar(require("fumadocs-ui/components/tabs"));
const mdx_1 = __importDefault(require("fumadocs-ui/mdx"));
const authors_1 = require("./components/authors");
const mermaid_1 = require("./components/mermaid");
const vercel_1 = require("./components/vercel");
// use this function to get MDX components, you will need it for rendering MDX
function getMDXComponents(components) {
    return {
        ...mdx_1.default,
        ...components,
        ...TabsComponents,
        ...StepsComponents,
        Authors: authors_1.Authors,
        VercelButton: vercel_1.VercelButton,
        Warning: ({ children }) => <callout_1.Callout type="warning">{children}</callout_1.Callout>,
        Tip: ({ children }) => <callout_1.Callout type="info">{children}</callout_1.Callout>,
        Info: ({ children }) => <callout_1.Callout type="info">{children}</callout_1.Callout>,
        Note: ({ children }) => <callout_1.Callout type="info">{children}</callout_1.Callout>,
        Mermaid: mermaid_1.Mermaid,
    };
}
