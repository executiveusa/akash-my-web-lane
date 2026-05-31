export declare const PROXY_URL: string;
export declare const PROXY_TOKEN: string;
export declare const PROXY_ENABLED: boolean;
export type TaskType = "reasoning" | "code" | "fast" | "balanced" | "long-context" | "vision" | "github-free" | "default";
export interface LLMMessage {
    role: "user" | "assistant" | "system";
    content: string;
}
export interface LLMOptions {
    task?: TaskType;
    systemPrompt?: string;
    maxTokens?: number;
    temperature?: number;
    proxyOverride?: boolean;
}
export declare function llmChat(messages: LLMMessage[], opts?: LLMOptions): Promise<string>;
export declare function llmStream(messages: LLMMessage[], opts?: LLMOptions): AsyncGenerator<string>;
export declare const ask: (q: string, task?: TaskType) => Promise<string>;
export declare const codeReview: (code: string) => Promise<string>;
export declare const summarize: (text: string) => Promise<string>;
export declare const analyze: (text: string) => Promise<string>;
//# sourceMappingURL=llm.d.ts.map