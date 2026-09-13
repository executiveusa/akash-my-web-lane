import { PiDashboard } from "../components/PiDashboard";

export const metadata = {
  title: "Pi Dashboard — My Web Lane",
  description: "Live migration pipeline, job monitoring, UDEC scores, and lead inbox for My Web Lane.",
};

// Force dynamic so we always get live DB data
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <PiDashboard />;
}
