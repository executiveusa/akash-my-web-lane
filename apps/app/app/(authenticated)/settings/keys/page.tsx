export default function ApiKeysPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ae-gold)" }}>
          API Keys
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage SYNTHIA Gateway, Razorpay, WhatsApp, and Cloudflare credentials
        </p>
      </div>
      <div className="ae-grid-bg rounded-xl border border-white/10 p-8 text-center text-muted-foreground">
        Secrets vault powered by IronClaw — coming soon.
      </div>
    </div>
  );
}
