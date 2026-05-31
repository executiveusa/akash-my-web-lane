"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("fumadocs-core/search/server");
const source_1 = require("@/lib/source");
exports.GET = (0, server_1.createFromSource)(source_1.source).GET;
