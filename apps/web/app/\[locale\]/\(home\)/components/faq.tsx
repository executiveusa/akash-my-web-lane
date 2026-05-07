"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ({ t }: { t: any }) {
  const faq = t?.web?.home?.faq || {};
  const items = faq.items || [];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{faq.title || "FAQ"}</h2>
          <p className="text-lg text-muted-foreground">{faq.description || ""}</p>
        </div>

        <div className="space-y-3">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 bg-muted/50 p-4 hover:bg-muted transition-colors text-left"
              >
                <span className="font-semibold">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gold transition-transform flex-shrink-0 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-4 py-4 text-muted-foreground bg-background">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
