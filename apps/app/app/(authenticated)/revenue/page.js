"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RevenuePage;
function RevenuePage() {
    return (<div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ae-gold)" }}>
          Revenue
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Payments across Razorpay (₹), Stripe ($), and PayPal (MXN)
        </p>
      </div>
      <div className="ae-grid-bg rounded-xl border border-white/10 p-8 text-center text-muted-foreground">
        Revenue analytics and payout history — coming soon.
      </div>
    </div>);
}
