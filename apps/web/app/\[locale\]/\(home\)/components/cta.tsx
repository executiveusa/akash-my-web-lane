"use client";

import { Button } from "@repo/design-system/button";
import { ArrowRight } from "lucide-react";

export function CTA({ t }: { t: any }) {
  const cta = t?.web?.home?.cta || {};
  const globalCta = t?.web?.global || {};

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-gradient-to-r from-gold/10 to-gold/5 border-t border-gold/20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold">{cta.title || "Ready to get started?"}</h2>
        <p className="mb-8 text-lg text-muted-foreground text-balance">{cta.description || ""}</p>
        <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold">
          {cta.button || globalCta.primaryCta || "शुरू करें"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
