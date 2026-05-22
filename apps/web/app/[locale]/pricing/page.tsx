import { Button } from "@repo/design-system/components/ui/button";
import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import { Check, MoveRight, PhoneCall } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
};

type MarketPricing = {
  currency: string;
  plans: PricingPlan[];
};

type PricingDictionary = {
  title: string;
  us?: MarketPricing;
  india?: MarketPricing;
  mx?: MarketPricing;
};

type PricingProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: PricingProps): Promise<Metadata> => {
  return createMetadata({
    title: "Pricing",
    description:
      "Simple, transparent pricing for every market. India, US, and Mexico.",
  });
};

const Pricing = async ({ params }: PricingProps) => {
  const { locale } = await params;

  // Static pricing data
  const pricing: PricingDictionary = {
    title: "Simple, Transparent Pricing",
    us: {
      currency: "$",
      plans: [
        {
          name: "Starter",
          price: "0",
          period: "first migration",
          description: "Perfect for trying us out",
          features: [
            "Full WordPress migration",
            "Lighthouse 90+ guarantee",
            "30-day support",
            "$0/month hosting",
          ],
          cta: "Start Free",
        },
        {
          name: "Pro",
          price: "299",
          period: "one-time",
          description: "For established businesses",
          features: [
            "Everything in Starter",
            "AI-powered search",
            "Custom domain setup",
            "Priority support",
            "Analytics dashboard",
          ],
          cta: "Get Started",
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "",
          description: "For large-scale migrations",
          features: [
            "Everything in Pro",
            "Multiple site migrations",
            "Dedicated account manager",
            "SLA guarantee",
            "Custom integrations",
          ],
          cta: "Contact Us",
        },
      ],
    },
  };

  const marketPlans = pricing.us;

  const plans: PricingPlan[] = marketPlans?.plans ?? [];

  const currency =
    locale === "hi" ? "₹" : locale === "es" ? "MXN " : "$";

  const guarantee =
    locale === "hi"
      ? "Lighthouse 90+ guarantee या पैसे वापस"
      : locale === "es"
        ? "Garantía Lighthouse 90+ o te devolvemos tu dinero"
        : "Lighthouse 90+ or full refund. No questions asked.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f2ece0]">
      {/* Header */}
      <div className="border-b border-[#f2ece0]/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-block rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-xs tracking-widest text-[#c9a84c] uppercase">
            Pricing
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {pricing.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[#f2ece0]/60">
            {guarantee}
          </p>
        </div>
      </div>

      {/* Plans grid */}
      <div className="container mx-auto px-4 py-20">
        <div
          className={`mx-auto grid max-w-5xl grid-cols-1 gap-6 ${
            plans.length === 3
              ? "md:grid-cols-3"
              : plans.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-1"
          }`}
        >
          {plans.map((plan) => {
            const isFeatured = Boolean(plan.badge);
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  isFeatured
                    ? "border-[#c9a84c]/50 bg-[#c9a84c]/5"
                    : "border-[#f2ece0]/10 bg-[#f2ece0]/3"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c9a84c] px-4 py-1 font-mono text-xs font-bold text-[#0a0a0a] uppercase tracking-widest">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-semibold text-lg text-[#f2ece0]">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-sm text-[#f2ece0]/50">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="font-bold text-4xl text-[#f2ece0]">
                    {currency}
                    {plan.price}
                  </span>
                  <span className="ml-2 text-sm text-[#f2ece0]/50">
                    {plan.period}
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[#f2ece0]/80"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4ade80]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={
                    isFeatured
                      ? "w-full bg-[#c9a84c] font-bold text-[#0a0a0a] hover:bg-[#e2bf6a]"
                      : "w-full border-[#f2ece0]/20 text-[#f2ece0] hover:bg-[#f2ece0]/5"
                  }
                  size="lg"
                  variant={isFeatured ? "default" : "outline"}
                >
                  <Link href={env.NEXT_PUBLIC_APP_URL}>
                    {plan.cta} <MoveRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom guarantee strip */}
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-6 text-center">
          <p className="font-semibold text-[#4ade80]">
            {locale === "hi"
              ? "₹0 hosting cost — Cloudflare Pages पर free forever"
              : locale === "es"
                ? "Hosting a $0 MXN — Cloudflare Pages gratis para siempre"
                : "$0/month hosting — Cloudflare Pages, free forever"}
          </p>
          <p className="mt-2 text-sm text-[#f2ece0]/50">
            {locale === "hi"
              ? "SSL, global CDN, unlimited bandwidth — सब included"
              : locale === "es"
                ? "SSL, CDN global, ancho de banda ilimitado — todo incluido"
                : "SSL, global CDN, unlimited bandwidth — all included"}
          </p>
        </div>

        {/* Contact for custom */}
        <div className="mt-12 text-center">
          <p className="text-[#f2ece0]/40">
            {locale === "hi"
              ? "Custom requirements हैं?"
              : locale === "es"
                ? "¿Tienes requerimientos especiales?"
                : "Have custom requirements?"}
          </p>
          <Button
            asChild
            className="mt-3 border-[#f2ece0]/20 text-[#f2ece0] hover:bg-[#f2ece0]/5"
            variant="outline"
          >
            <Link href="/contact">
              {locale === "hi"
                ? "हमसे बात करें"
                : locale === "es"
                  ? "Habla con nosotros"
                  : "Talk to us"}{" "}
              <PhoneCall className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
