import { SYNTHIAAdvisorWidget } from "./components/synthia-advisor";

const metrics = [
  { label: "Today's revenue", value: "$4,890", note: "Stripe + Razorpay" },
  { label: "Active migrations", value: "18", note: "6 at risk" },
  { label: "Average Lighthouse", value: "93", note: "last 30 days" },
  { label: "Scout leads overnight", value: "47", note: "11 high-fit" },
];

const activeJobs = [
  { client: "Sunrise Dental", stage: "deploying", progress: 85 },
  { client: "Rivera Law Group", stage: "generating", progress: 62 },
  { client: "Bombay Bites", stage: "extracting", progress: 24 },
];

const scout = [
  "47 slow WordPress sites detected in target markets",
  "19 previews generated successfully",
  "11 prospects enriched with contact data",
  "6 outreach sequences scheduled",
];

export default async function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div className="rounded-xl border bg-card p-4" key={metric.label}>
            <p className="text-muted-foreground text-sm">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-muted-foreground text-xs">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="mb-3 font-semibold text-xl">Active migrations</h2>
          <div className="space-y-3">
            {activeJobs.map((job) => (
              <div key={job.client}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{job.client}</span>
                  <span className="text-muted-foreground">{job.stage}</span>
                </div>
                <div className="h-2 rounded bg-muted">
                  <div className="h-2 rounded bg-primary" style={{ width: `${job.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-5">
          <h2 className="mb-3 font-semibold text-xl">Scout activity</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {scout.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="mb-3 font-semibold text-xl">Client roster snapshot</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2">Client</th>
                <th className="py-2">Industry</th>
                <th className="py-2">Lighthouse</th>
                <th className="py-2">UDEC</th>
                <th className="py-2">MRR</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Sunrise Dental</td><td>Dental Clinic</td><td className="text-green-500">96</td><td>9.3</td><td>$699</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Rivera Law Group</td><td>Law Firm</td><td className="text-yellow-500">82</td><td>8.8</td><td>$499</td>
              </tr>
              <tr>
                <td className="py-2">Bombay Bites</td><td>Restaurant</td><td className="text-red-500">67</td><td>7.9</td><td>$299</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <SYNTHIAAdvisorWidget />
    </div>
  );
}
