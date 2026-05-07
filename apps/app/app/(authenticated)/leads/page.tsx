export default function LeadsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ae-gold)" }}>
          Lead Pipeline
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          WordPress sites scouted and queued for outreach
        </p>
      </div>
      <div className="ae-grid-bg rounded-xl border border-white/10 p-8 text-center text-muted-foreground">
        Lead pipeline coming soon — Scout Agent feeds this automatically.
      </div>
    </div>
  );
}
