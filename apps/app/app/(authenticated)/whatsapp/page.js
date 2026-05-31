"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WhatsAppPage;
function WhatsAppPage() {
    return (<div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ae-gold)" }}>
          WhatsApp Outreach
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Automated trilingual (EN / HI / ES) client communications
        </p>
      </div>
      <div className="ae-grid-bg rounded-xl border border-white/10 p-8 text-center text-muted-foreground">
        Message log and template manager — coming soon.
      </div>
    </div>);
}
