import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
export declare function POST(request: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null;
}>>;
//# sourceMappingURL=route.d.ts.map