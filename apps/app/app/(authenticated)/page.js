"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const synthia_advisor_1 = require("./components/synthia-advisor");
const database_1 = require("@repo/database");
const server_1 = require("@repo/auth/server");
async function DashboardPage() {
    const { userId } = await (0, server_1.auth)();
    // Fetch real metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [todayRevenue, activeMigrations, avgScoreAgg, recentJobs] = await Promise.all([
        database_1.database.job.aggregate({
            where: { orgId: userId || "system", createdAt: { gte: today }, status: "completed" },
            _sum: { amountPaid: true },
        }),
        database_1.database.job.count({
            where: { orgId: userId || "system", status: { in: ["queued", "running"] } },
        }),
        database_1.database.job.aggregate({
            where: { orgId: userId || "system", status: "completed", udecScore: { not: null } },
            _avg: { udecScore: true },
        }),
        database_1.database.job.findMany({
            where: { orgId: userId || "system" },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { client: true },
        })
    ]);
    const metrics = [
        { label: "Today's revenue", value: `$${((todayRevenue._sum.amountPaid || 0) / 100).toFixed(2)}`, note: "Stripe" },
        { label: "Active migrations", value: activeMigrations.toString(), note: "In progress" },
        { label: "Avg UDEC Score", value: (avgScoreAgg._avg.udecScore || 0).toFixed(1), note: "Target: 8.5" },
    ];
    return (<div className="flex flex-1 flex-col gap-8 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (<div key={metric.label} className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">{metric.label}</h3>
            <div className="mt-2 text-3xl font-bold">{metric.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>
          </div>))}
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Recent Migrations</h2>
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">Lighthouse</th>
                <th className="px-4 py-3 font-medium">UDEC</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentJobs.length === 0 ? (<tr>
                  <td colSpan={5} className="px-4 py-3 text-center text-muted-foreground">No recent migrations</td>
                </tr>) : (recentJobs.map((job) => (<tr key={job.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{job.client?.businessName || job.id}</td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{job.client?.industry || "N/A"}</td>
                    <td className="px-4 py-3 font-mono">{job.lighthouseScore || "-"}</td>
                    <td className="px-4 py-3 font-mono font-medium">
                      <span className={(job.udecScore || 0) >= 8.5 ? "text-emerald-500" : "text-amber-500"}>
                        {job.udecScore || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`capitalize inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${job.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                job.status === "failed" ? "bg-red-100 text-red-700" :
                    "bg-blue-100 text-blue-700"}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>)))}
            </tbody>
          </table>
        </div>
      </section>

      <synthia_advisor_1.SYNTHIAAdvisorWidget />
    </div>);
}
