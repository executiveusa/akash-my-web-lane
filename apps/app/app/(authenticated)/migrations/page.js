"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MigrationsPage;
const link_1 = __importDefault(require("next/link"));
const env_1 = require("@/env");
async function getJobs() {
    try {
        const res = await fetch(`${env_1.env.LANE_API_URL}/api/jobs`, {
            headers: { Authorization: `Bearer ${env_1.env.LANE_API_KEY}` },
            cache: "no-store",
        });
        if (!res.ok)
            return [];
        return await res.json();
    }
    catch {
        return [];
    }
}
async function MigrationsPage() {
    const jobs = await getJobs();
    return (<div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Migration Job Tracker</h1>
      <div className="overflow-x-auto rounded-xl border bg-card p-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-2">Client</th><th>WordPress URL</th><th>Stage</th><th>Progress</th><th>UDEC</th><th>Lighthouse</th><th>Links</th><th>WhatsApp</th><th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (<tr className="border-b" key={job.id}>
                <td className="py-2">{job.client_name}</td>
                <td>{job.wp_url}</td>
                <td>{job.stage}</td>
                <td>{job.progress}%</td>
                <td>{job.udec_score ?? "—"}</td>
                <td>{job.lighthouse_score ?? "—"}</td>
                <td className="space-x-2">
                  {job.preview_url && <link_1.default className="underline" href={job.preview_url}>Preview</link_1.default>}
                  {job.admin_url && <link_1.default className="underline" href={job.admin_url}>Admin</link_1.default>}
                </td>
                <td>{job.whatsapp_status ?? "pending"}</td>
                <td>{job.revenue_collected ?? 0}</td>
              </tr>))}
            {jobs.length === 0 && (<tr>
                <td className="py-4 text-muted-foreground" colSpan={9}>No jobs returned from API.</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>);
}
