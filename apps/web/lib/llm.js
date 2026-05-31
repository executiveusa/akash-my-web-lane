"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = exports.summarize = exports.codeReview = exports.ask = exports.PROXY_ENABLED = exports.PROXY_TOKEN = exports.PROXY_URL = void 0;
exports.llmChat = llmChat;
exports.llmStream = llmStream;
const openai_1 = __importDefault(require("openai"));
exports.PROXY_URL = process.env.LLM_PROXY_URL ?? "http://localhost:8082";
exports.PROXY_TOKEN = process.env.LLM_PROXY_TOKEN ?? "freecc";
exports.PROXY_ENABLED = process.env.LLM_PROXY_ENABLED !== "false";
const TASK_ROUTES = {
    reasoning: { model: "claude-opus-4-5", maxTokens: 8192 },
    code: { model: "claude-haiku-4-5", maxTokens: 4096 },
    fast: { model: "claude-haiku-4-5", maxTokens: 2048 },
    balanced: { model: "claude-sonnet-4-5", maxTokens: 4096 },
    "long-context": {
        model: "gemini-2.5-flash",
        direct: true,
        provider: "https://generativelanguage.googleapis.com/v1beta/openai",
        apiKeyEnv: "GEMINI_API_KEY",
        maxTokens: 32768,
    },
    vision: {
        model: "gemini-2.5-flash",
        direct: true,
        provider: "https://generativelanguage.googleapis.com/v1beta/openai",
        apiKeyEnv: "GEMINI_API_KEY",
        maxTokens: 8192,
    },
    "github-free": {
        model: "gpt-4.1-mini",
        direct: true,
        provider: "https://models.github.ai/inference",
        apiKeyEnv: "GITHUB_TOKEN",
        maxTokens: 4096,
    },
    default: { model: "claude-sonnet-4-5", maxTokens: 4096 },
};
function env(name) {
    const v = process.env[name];
    return v && v.trim() ? v : undefined;
}
function makeClient(route, proxyEnabled) {
    if (route.direct || !proxyEnabled) {
        const apiKey = route.apiKeyEnv ? env(route.apiKeyEnv) : env("OPENAI_API_KEY");
        if (!apiKey) {
            throw new Error(`Missing API key env: ${route.apiKeyEnv ?? "OPENAI_API_KEY"}`);
        }
        return new openai_1.default({ baseURL: route.provider, apiKey });
    }
    return new openai_1.default({
        baseURL: `${exports.PROXY_URL}/v1`,
        apiKey: exports.PROXY_TOKEN,
        defaultHeaders: { "anthropic-version": "2023-06-01" },
    });
}
async function llmChat(messages, opts = {}) {
    const task = opts.task ?? "default";
    const route = TASK_ROUTES[task];
    const useProxy = opts.proxyOverride ?? exports.PROXY_ENABLED;
    const client = makeClient(route, useProxy);
    const allMessages = opts.systemPrompt
        ? [{ role: "system", content: opts.systemPrompt }, ...messages]
        : messages;
    const resp = await client.chat.completions.create({
        model: route.model,
        messages: allMessages,
        max_tokens: opts.maxTokens ?? route.maxTokens,
        temperature: opts.temperature ?? 0.7,
        stream: false,
    });
    return resp.choices?.[0]?.message?.content ?? "";
}
async function* llmStream(messages, opts = {}) {
    const task = opts.task ?? "default";
    const route = TASK_ROUTES[task];
    const useProxy = opts.proxyOverride ?? exports.PROXY_ENABLED;
    const client = makeClient(route, useProxy);
    const allMessages = opts.systemPrompt
        ? [{ role: "system", content: opts.systemPrompt }, ...messages]
        : messages;
    const stream = await client.chat.completions.create({
        model: route.model,
        messages: allMessages,
        max_tokens: opts.maxTokens ?? route.maxTokens,
        temperature: opts.temperature ?? 0.7,
        stream: true,
    });
    for await (const chunk of stream) {
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta)
            yield delta;
    }
}
const ask = (q, task = "default") => llmChat([{ role: "user", content: q }], { task });
exports.ask = ask;
const codeReview = (code) => llmChat([{ role: "user", content: `Review this code:\n\n${code}` }], { task: "code" });
exports.codeReview = codeReview;
const summarize = (text) => llmChat([{ role: "user", content: `Summarize concisely:\n${text}` }], { task: "fast" });
exports.summarize = summarize;
const analyze = (text) => llmChat([{ role: "user", content: text }], { task: "reasoning" });
exports.analyze = analyze;
