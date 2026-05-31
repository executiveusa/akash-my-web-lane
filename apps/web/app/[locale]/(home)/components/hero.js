"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const button_1 = require("@repo/design-system/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const env_1 = require("@/env");
const Hero = async ({ dictionary, locale }) => {
    const d = dictionary.web.home.hero;
    return (<section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] py-24 text-[#f2ece0]">
      <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
        }}/>
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#c9a84c] opacity-[0.04] blur-[120px]"/>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <a className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-4 py-2 text-sm font-medium text-[#c9a84c] transition-colors hover:border-[#c9a84c]/60" href="/blog">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c9a84c]"/>
            {d.announcement}
          </a>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl leading-[1.05] tracking-tight md:text-7xl">
            <span className="text-[#e85555]">
              {locale === "hi"
            ? "WordPress छोड़ो।"
            : locale === "es"
                ? "WordPress te está fallando."
                : "Your WordPress site"}
            </span>
            <br />
            {locale === "hi" ? ("AI-Ready बनो।") : locale === "es" ? ("Te lo arreglamos en 25 minutos.") : (<>
                <span className="text-[#f2ece0]">loads in </span>
                <span className="font-mono text-[#e85555]">6.2s</span>
                <span className="text-[#f2ece0]">.</span>
                <br />
                <span className="text-[#f2ece0]">Ours loads in </span>
                <span className="font-mono text-[#4ade80]">0.4s</span>
                <span className="text-[#f2ece0]">.</span>
              </>)}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#f2ece0]/70 md:text-xl">
            Transform your WordPress site into a blazing-fast, AI-powered experience.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <button_1.Button asChild className="h-14 rounded-xl bg-[#c9a84c] px-8 text-base font-bold text-[#0a0a0a] hover:bg-[#e2bf6a]" size="lg">
              <link_1.default href={`${env_1.env.NEXT_PUBLIC_APP_URL}/sign-up`}>Get Started Free</link_1.default>
            </button_1.Button>
            <button_1.Button asChild className="h-14 rounded-xl border-[#f2ece0]/20 px-8 text-base font-medium text-[#f2ece0] hover:bg-[#f2ece0]/5" size="lg" variant="outline">
              <link_1.default href="/contact">Talk to Us</link_1.default>
            </button_1.Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#f2ece0]/40">
            <span>✓ 500+ sites migrated</span>
            <span>✓ Lighthouse 90+ guaranteed</span>
            <span>✓ $0/month hosting</span>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#e85555]/20 bg-[#e85555]/5 p-6">
              <div className="mb-2 font-mono text-xs tracking-widest text-[#e85555]/60 uppercase">
                Before — WordPress
              </div>
              <div className="mb-1 font-mono text-4xl font-bold text-[#e85555]">6.2s</div>
              <div className="text-sm text-[#f2ece0]/40">Lighthouse: 34/100</div>
              <div className="mt-4 space-y-2 text-xs text-[#f2ece0]/50">
                <div>• 47 HTTP requests</div>
                <div>• 3.2MB page weight</div>
                <div>• 12 plugins loaded</div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-6">
              <div className="mb-2 font-mono text-xs tracking-widest text-[#4ade80]/60 uppercase">
                After — Akash Engine™
              </div>
              <div className="mb-1 font-mono text-4xl font-bold text-[#4ade80]">0.4s</div>
              <div className="text-sm text-[#f2ece0]/40">Lighthouse: 97/100</div>
              <div className="mt-4 space-y-2 text-xs text-[#f2ece0]/50">
                <div>• 8 HTTP requests</div>
                <div>• 180KB page weight</div>
                <div>• No plugins ever</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
exports.Hero = Hero;
