import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MoveRight, Zap } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

type HeroProps = {
  dictionary: Dictionary;
  locale?: string;
};

export const Hero = async ({ dictionary, locale = "en" }: HeroProps) => (
  <div
    className="relative w-full overflow-hidden"
    style={{ background: "#07090f", minHeight: "100vh" }}
  >
    {/* Grid background */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(rgba(201,168,76,0.7) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(201,168,76,0.7) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }}
    />
    {/* Glow orb */}
    <div
      className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: 700,
        height: 700,
        background:
          "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)",
      }}
    />

    <div className="container relative z-10 mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-8 py-24 lg:py-40">

        {/* Announcement badge */}
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              background: "rgba(201,168,76,0.1)",
              color: "#c9a84c",
            }}
          >
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full"
              style={{ background: "#c9a84c" }}
            />
            {dictionary.web.home.hero.announcement}
            <MoveRight className="h-3 w-3" />
          </div>
        </div>

        {/* Main headline */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1
            className="max-w-4xl tracking-tight"
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 800,
              lineHeight: 1.0,
              color: "#f2ece0",
              letterSpacing: "-0.03em",
            }}
          >
            {locale === "hi" ? (
              <>
                <span style={{ color: "#e85555" }}>WordPress</span> छोड़ो।
                <br />
                <span style={{ color: "#c9a84c" }}>AI-Ready</span> बनो।
              </>
            ) : locale === "es" ? (
              <>
                <span style={{ color: "#f2ece0" }}>Tu sitio WordPress</span>
                <br />
                tarda <span style={{ color: "#e85555", fontFamily: "monospace" }}>6s</span>.
                <br />
                El nuestro,{" "}
                <span style={{ color: "#4ade80", fontFamily: "monospace" }}>0.4s</span>.
              </>
            ) : (
              <>
                <span style={{ color: "#f2ece0" }}>Your WordPress site</span>
                <br />
                loads in{" "}
                <span style={{ color: "#e85555", fontFamily: "monospace" }}>6.2s</span>.
                <br />
                Ours loads in{" "}
                <span style={{ color: "#4ade80", fontFamily: "monospace" }}>0.4s</span>.
              </>
            )}
          </h1>
          <p
            className="max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ color: "rgba(242,236,224,0.6)" }}
          >
            {dictionary.web.home.meta.description}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-14 gap-3 rounded-xl px-8 text-base font-bold"
            style={{ background: "#c9a84c", color: "#07090f" }}
          >
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              <Zap className="h-4 w-4" />
              {dictionary.web.global.primaryCta}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 gap-3 rounded-xl px-8 text-base"
            style={{
              border: "1px solid rgba(242,236,224,0.15)",
              color: "rgba(242,236,224,0.7)",
              background: "transparent",
            }}
          >
            <Link href="/contact">
              {dictionary.web.global.secondaryCta}
              <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 text-sm"
          style={{ color: "rgba(242,236,224,0.3)" }}
        >
          <span>✓ 1,000+ agencies switched</span>
          <span>✓ Lighthouse 90+ guaranteed</span>
          <span>✓ $0/month hosting forever</span>
        </div>

        {/* Speed comparison cards */}
        <div className="mt-4 grid w-full max-w-2xl grid-cols-2 gap-4">
          {/* Before */}
          <div
            className="rounded-2xl p-6"
            style={{
              border: "1px solid rgba(232,85,85,0.25)",
              background: "rgba(232,85,85,0.05)",
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(232,85,85,0.6)",
                marginBottom: 8,
              }}
            >
              Before — WordPress
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 48,
                fontWeight: 700,
                color: "#e85555",
                lineHeight: 1,
              }}
            >
              6.2s
            </div>
            <div style={{ fontSize: 12, color: "rgba(242,236,224,0.35)", marginTop: 4 }}>
              Lighthouse: 34 / 100
            </div>
            <div style={{ marginTop: 16, fontSize: 11, color: "rgba(242,236,224,0.35)" }}>
              <div>• 47 HTTP requests</div>
              <div>• 3.2MB page weight</div>
              <div>• 12 plugins loaded</div>
            </div>
          </div>
          {/* After */}
          <div
            className="rounded-2xl p-6"
            style={{
              border: "1px solid rgba(74,222,128,0.25)",
              background: "rgba(74,222,128,0.05)",
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(74,222,128,0.6)",
                marginBottom: 8,
              }}
            >
              After — Akash Engine™
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 48,
                fontWeight: 700,
                color: "#4ade80",
                lineHeight: 1,
              }}
            >
              0.4s
            </div>
            <div style={{ fontSize: 12, color: "rgba(242,236,224,0.35)", marginTop: 4 }}>
              Lighthouse: 97 / 100
            </div>
            <div style={{ marginTop: 16, fontSize: 11, color: "rgba(242,236,224,0.35)" }}>
              <div>• 8 HTTP requests</div>
              <div>• 180KB page weight</div>
              <div>• Zero plugins ever</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
