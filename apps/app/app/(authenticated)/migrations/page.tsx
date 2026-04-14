import Link from "next/link";
import { env } from "@/env";

type Job = {
  id: string;
  client_name: string;
  wp_url: string;
  stage: string;
  progress: number;
  udec_score?: number;
  lighthouse_score?: number;
  preview_url?: string;
  admin_url?: string;
  whatsapp_status?: string;
  revenue_collected?: number;
};

async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${env.LANE_API_URL}/api/jobs`, {
      headers: { Authorization: `Bearer ${env.LANE_API_KEY}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function MigrationsPage() {
  const jobs = await getJobs();

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Migration Job Tracker</h1>
      <div className="overflow-x-auto rounded-xl border bg-card p-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-2">Client</th><th>WordPress URL</th><th>Stage</th><th>Progress</th><th>UDEC</th><th>Lighthouse</th><th>Links</th><th>WhatsApp</th><th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr className="border-b" key={job.id}>
                <td className="py-2">{job.client_name}</td>
                <td>{job.wp_url}</td>
                <td>{job.stage}</td>
                <td>{job.progress}%</td>
                <td>{job.udec_score ?? "—"}</td>
                <td>{job.lighthouse_score ?? "—"}</td>
                <td className="space-x-2">
                  {job.preview_url && <Link className="underline" href={job.preview_url}>Preview</Link>}
                  {job.admin_url && <Link className="underline" href={job.admin_url}>Admin</Link>}
                </td>
                <td>{job.whatsapp_status ?? "pending"}</td>
                <td>{job.revenue_collected ?? 0}</td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td className="py-4 text-muted-foreground" colSpan={9}>No jobs returned from API.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
