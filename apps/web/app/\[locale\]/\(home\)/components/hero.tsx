"use client";

import { Button } from "@repo/design-system/button";
import { ArrowRight, Zap, Shield, Cloud } from "lucide-react";

export function Hero({ t }: { t: any }) {
  const heroText = t?.web?.home?.hero || {};
  const globalCta = t?.web?.global || {};

  return (
    <section className="w-full bg-gradient-to-b from-background to-background/80 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Announcement Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold">
            <Zap className="h-4 w-4" />
            <span className="text-balance">{heroText.announcement || "🚀 Free migration for first 100 Indian developers"}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">WordPress छोड़ो।</span>
            <br />
            <span className="bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">AI-Ready बनो।</span>
            <br />
            <span className="text-balance">25 मिनट में।</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground text-balance">
            Akash Engine आपके Client की WordPress site को lightning-fast, AI-ready website में बदल देता है। Lighthouse 90+ guaranteed। ₹0/month hosting हमेशा के लिए।
          </p>
        </div>

        {/* Speed Comparison Cards */}
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-red/20 bg-red/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-red" />
              <span className="text-sm font-medium text-red">WordPress</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-foreground">6.2s</div>
              <p className="text-sm text-muted-foreground">Average load time</p>
            </div>
            <div className="text-xs text-muted-foreground">❌ 34/100 Lighthouse score</div>
          </div>

          <div className="rounded-lg border border-gold/20 bg-gold/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="h-5 w-5 text-gold" />
              <span className="text-sm font-medium text-gold">Akash Engine</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-gold">0.4s</div>
              <p className="text-sm text-muted-foreground">Average load time</p>
            </div>
            <div className="text-xs text-gold">✅ 94/100 Lighthouse score</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4 justify-center sm:flex-row sm:gap-6">
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold">
            {globalCta.primaryCta || "मुफ्त में माइग्रेशन शुरू करें"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10">
            {globalCta.secondaryCta || "3 मिनट का demo देखें"}
          </Button>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ✅ 1,000+ Indian developers already using Akash Engine
          </p>
        </div>
      </div>
    </section>
  );
}
