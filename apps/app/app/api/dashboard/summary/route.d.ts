import { NextResponse } from "next/server";
export declare function GET(): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    active_migrations: {
        id: string;
        client: string;
        wpUrl: string;
        stage: string;
        progress: number;
        status: string;
    }[];
    metrics: {
        active: number;
        completed_30d: number;
        failed_30d: number;
        leads_new: number;
        revenue_30d_paise: number;
        avg_lighthouse: number;
        avg_udec: number;
        ai_spend_usd: number;
    };
}>>;
//# sourceMappingURL=route.d.ts.map