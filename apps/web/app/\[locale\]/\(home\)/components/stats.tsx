"use client";

import { TrendingUp } from "lucide-react";

export function Stats({ t }: { t: any }) {
  const stats = t?.web?.home?.stats || {};
  const items = stats.items || [];

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{stats.title || "Stats"}</h2>
          <p className="text-lg text-muted-foreground">{stats.description || ""}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="rounded-lg border border-gold/20 bg-gold/5 p-6 text-center">
              <TrendingUp className="h-5 w-5 text-gold mx-auto mb-3" />
              <div className="mb-2 text-3xl md:text-4xl font-bold text-foreground">{item.metric}</div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
