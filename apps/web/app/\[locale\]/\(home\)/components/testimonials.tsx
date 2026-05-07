"use client";

import { Quote } from "lucide-react";
import Image from "next/image";

export function Testimonials({ t }: { t: any }) {
  const testimonials = t?.web?.home?.testimonials || {};
  const items = testimonials.items || [];

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{testimonials.title || "Testimonials"}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="rounded-lg border border-border bg-background p-6">
              <Quote className="h-5 w-5 text-gold mb-4" />
              <p className="mb-4 text-foreground italic">&quot;{item.description}&quot;</p>
              <div className="flex items-center gap-3">
                {item.author?.image && (
                  <Image
                    src={item.author.image}
                    alt={item.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">{item.author?.name || "Anonymous"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
