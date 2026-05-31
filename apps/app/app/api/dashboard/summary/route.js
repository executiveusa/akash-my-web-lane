"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const database_1 = require("@repo/database");
const server_1 = require("next/server");
const server_2 = require("@repo/auth/server");
const stageProgress = {
    queued: 5,
    extracting: 20,
    transforming: 45,
    generating: 65,
    deploying: 85,
    done: 100,
};
async function GET() {
    const { orgId } = await (0, server_2.auth)();
    if (!orgId)
        return server_1.NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const [activeJobs, allJobs, leads, spend] = await Promise.all([
        database_1.database.job.findMany({
            where: { orgId, status: { in: ["queued", "running"] } },
            orderBy: { createdAt: "desc" },
            take: 20,
            include: { client: { select: { businessName: true, wpUrl: true } } },
        }),
        database_1.database.job.findMany({
            where: {
                orgId,
                createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            },
            select: {
                status: true,
                costUsd: true,
                amountPaid: true,
                currency: true,
                lighthouseScore: true,
                udecScore: true,
            },
        }),
        database_1.database.lead.count({ where: { orgId, status: "new" } }),
        database_1.database.spend.aggregate({
            where: {
                orgId,
                date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) },
            },
            _sum: { costUsd: true },
        }),
    ]);
    const completed = allJobs.filter((j) => j.status === "completed");
    const failed = allJobs.filter((j) => j.status === "failed");
    const totalRevenue = allJobs.reduce((sum, j) => sum + (j.amountPaid ?? 0), 0);
    const avgLighthouse = completed.length
        ? completed.reduce((s, j) => s + (j.lighthouseScore ?? 0), 0) / completed.length
        : 0;
    const avgUdec = completed.length
        ? completed.reduce((s, j) => s + (j.udecScore ?? 0), 0) / completed.length
        : 0;
    return server_1.NextResponse.json({
        active_migrations: activeJobs.map((j) => ({
            id: j.id,
            client: j.client.businessName,
            wpUrl: j.client.wpUrl,
            stage: j.stage,
            progress: stageProgress[j.stage] ?? j.progress,
            status: j.status,
        })),
        metrics: {
            active: activeJobs.length,
            completed_30d: completed.length,
            failed_30d: failed.length,
            leads_new: leads,
            revenue_30d_paise: totalRevenue,
            avg_lighthouse: Math.round(avgLighthouse),
            avg_udec: parseFloat(avgUdec.toFixed(1)),
            ai_spend_usd: spend._sum.costUsd ?? 0,
        },
    });
}
