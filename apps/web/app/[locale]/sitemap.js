"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const cms_1 = require("@repo/cms");
const env_1 = require("@/env");
const appFolders = node_fs_1.default.readdirSync("app", { withFileTypes: true });
const pages = appFolders
    .filter((file) => file.isDirectory())
    .filter((folder) => !folder.name.startsWith("_"))
    .filter((folder) => !folder.name.startsWith("("))
    .map((folder) => folder.name);
const blogs = (await cms_1.blog.getPosts()).map((post) => post._slug);
const legals = (await cms_1.legal.getPosts()).map((post) => post._slug);
const protocol = env_1.env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith("https")
    ? "https"
    : "http";
const url = new URL(`${protocol}://${env_1.env.VERCEL_PROJECT_PRODUCTION_URL}`);
const sitemap = async () => [
    {
        url: new URL("/", url).href,
        lastModified: new Date(),
    },
    ...pages.map((page) => ({
        url: new URL(page, url).href,
        lastModified: new Date(),
    })),
    ...blogs.map((blog) => ({
        url: new URL(`blog/${blog}`, url).href,
        lastModified: new Date(),
    })),
    ...legals.map((legal) => ({
        url: new URL(`legal/${legal}`, url).href,
        lastModified: new Date(),
    })),
];
exports.default = sitemap;
