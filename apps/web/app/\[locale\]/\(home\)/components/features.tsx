"use client";

import { CheckCircle } from "lucide-react";

export function Features({ t }: { t: any }) {
  const features = t?.web?.home?.features || {};
  const items = features.items || [];

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{features.title || "Features"}</h2>
          <p className="text-lg text-muted-foreground">{features.description || ""}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="rounded-lg border border-border bg-background p-6 hover:border-gold/50 transition-colors">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2 font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
