export default function MarketInPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ae-gold)" }}>
          India Market
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Hindi-first outreach · Razorpay ₹INR · Tier-2/3 city targeting
        </p>
      </div>
      <div className="ae-grid-bg rounded-xl border border-white/10 p-8 text-center text-muted-foreground">
        India market dashboard — lead density maps, WhatsApp campaign stats — coming soon.
      </div>
    </div>
  );
}
