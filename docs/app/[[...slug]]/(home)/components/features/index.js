"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Features = void 0;
const image_1 = __importDefault(require("next/image"));
const utils_1 = require("@/lib/utils");
const arcjet_svg_1 = __importDefault(require("./arcjet.svg"));
const basehub_svg_1 = __importDefault(require("./basehub.svg"));
const better_stack_svg_1 = __importDefault(require("./better-stack.svg"));
const clerk_svg_1 = __importDefault(require("./clerk.svg"));
const cmdk_svg_1 = __importDefault(require("./cmdk.svg"));
const google_analytics_svg_1 = __importDefault(require("./google-analytics.svg"));
const liveblocks_svg_1 = __importDefault(require("./liveblocks.svg"));
const lucide_svg_1 = __importDefault(require("./lucide.svg"));
const neon_svg_1 = __importDefault(require("./neon.svg"));
const posthog_svg_1 = __importDefault(require("./posthog.svg"));
const prisma_svg_1 = __importDefault(require("./prisma.svg"));
const radix_svg_1 = __importDefault(require("./radix.svg"));
const react_svg_1 = __importDefault(require("./react.svg"));
const react_email_svg_1 = __importDefault(require("./react-email.svg"));
const recharts_svg_1 = __importDefault(require("./recharts.svg"));
const resend_svg_1 = __importDefault(require("./resend.svg"));
const sentry_svg_1 = __importDefault(require("./sentry.svg"));
const stripe_svg_1 = __importDefault(require("./stripe.svg"));
const svix_svg_1 = __importDefault(require("./svix.svg"));
const tailwind_svg_1 = __importDefault(require("./tailwind.svg"));
const typescript_svg_1 = __importDefault(require("./typescript.svg"));
const ultracite_svg_1 = __importDefault(require("./ultracite.svg"));
const vercel_svg_1 = __importDefault(require("./vercel.svg"));
const zod_svg_1 = __importDefault(require("./zod.svg"));
const rows = [
    {
        row: [
            {
                label: "BetterStack",
                src: better_stack_svg_1.default,
                className: "[animation-delay:-26s] [animation-duration:30s]",
            },
            {
                label: "Clerk",
                src: clerk_svg_1.default,
                className: "[animation-delay:-8s] [animation-duration:30s]",
            },
            {
                label: "Ultracite",
                src: ultracite_svg_1.default,
                className: "[animation-delay:-18s] [animation-duration:30s]",
            },
            {
                label: "Resend",
                src: resend_svg_1.default,
                className: "[animation-delay:-22s] [animation-duration:30s]",
            },
        ],
    },
    {
        row: [
            {
                label: "BaseHub",
                src: basehub_svg_1.default,
                className: "[animation-delay:-40s] [animation-duration:40s]",
            },
            {
                label: "Google Analytics",
                src: google_analytics_svg_1.default,
                className: "[animation-delay:-20s] [animation-duration:40s]",
            },
            {
                label: "Lucide",
                src: lucide_svg_1.default,
                className: "[animation-delay:-30s] [animation-duration:40s]",
            },
            {
                label: "PostHog",
                src: posthog_svg_1.default,
                className: "[animation-delay:-35s] [animation-duration:40s]",
            },
        ],
    },
    {
        row: [
            {
                label: "Prisma",
                src: prisma_svg_1.default,
                className: "[animation-delay:-10s] [animation-duration:40s]",
            },
            {
                label: "Radix UI",
                src: radix_svg_1.default,
                className: "[animation-delay:-32s] [animation-duration:40s]",
            },
            {
                label: "Arcjet",
                src: arcjet_svg_1.default,
                className: "[animation-delay:-22s] [animation-duration:40s]",
            },
            {
                label: "Liveblocks",
                src: liveblocks_svg_1.default,
                className: "[animation-delay:-28s] [animation-duration:40s]",
            },
        ],
    },
    {
        row: [
            {
                label: "React Email",
                src: react_email_svg_1.default,
                className: "[animation-delay:-45s] [animation-duration:45s]",
            },
            {
                label: "Sentry",
                src: sentry_svg_1.default,
                className: "[animation-delay:-23s] [animation-duration:45s]",
            },
            {
                label: "React",
                src: react_svg_1.default,
                className: "[animation-delay:-34s] [animation-duration:45s]",
            },
            {
                label: "CMDK",
                src: cmdk_svg_1.default,
                className: "[animation-delay:-39s] [animation-duration:45s]",
            },
        ],
    },
    {
        row: [
            {
                label: "Stripe",
                src: stripe_svg_1.default,
                className: "[animation-delay:-55s] [animation-duration:60s]",
            },
            {
                label: "Tailwind CSS",
                src: tailwind_svg_1.default,
                className: "[animation-delay:-20s] [animation-duration:60s]",
            },
            {
                label: "Neon",
                src: neon_svg_1.default,
                className: "[animation-delay:-38s] [animation-duration:60s]",
            },
            {
                label: "Recharts",
                src: recharts_svg_1.default,
                className: "[animation-delay:-45s] [animation-duration:60s]",
            },
        ],
    },
    {
        row: [
            {
                label: "TypeScript",
                src: typescript_svg_1.default,
                className: "[animation-delay:-9s] [animation-duration:40s]",
            },
            {
                label: "Svix",
                src: svix_svg_1.default,
                className: "[animation-delay:-28s] [animation-duration:40s]",
            },
            {
                label: "Vercel",
                src: vercel_svg_1.default,
                className: "[animation-delay:-18s] [animation-duration:40s]",
            },
            {
                label: "Zod",
                src: zod_svg_1.default,
                className: "[animation-delay:-33s] [animation-duration:40s]",
            },
        ],
    },
];
const Features = () => (<section className="dark h-[400px] sm:h-[800px]" id="features">
    <div aria-hidden="true" className="relative h-full overflow-hidden bg-background py-24 ring-inset sm:py-32">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 mx-auto w-full max-w-[90%] text-center">
        <div className="relative z-10">
          <p className="mx-auto mt-2 max-w-3xl text-pretty font-semibold text-4xl text-foreground/10 tracking-tight sm:text-5xl md:text-6xl">
            Built with the best tools for modern developers
          </p>
        </div>
      </div>
      <div className="absolute inset-0 grid grid-cols-1 pt-0 [container-type:inline-size]">
        {rows.map((rowData, index) => (<div className="group relative" key={index}>
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[length:12px_100%] bg-gradient-to-r from-[2px] from-background/15 to-[2px] dark:from-foreground/15"/>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[length:12px_100%] bg-gradient-to-r from-[2px] from-background/5 to-[2px] group-last:hidden dark:from-foreground/5"/>
            {rowData.row.map((logo, _logoIndex) => (<div className={(0, utils_1.cn)(logo.className, "absolute top-[50px] flex items-center gap-2 whitespace-nowrap px-3 py-1", "rounded-full bg-gradient-to-t from-50% from-secondary/50 to-secondary/50 ring-1 ring-background/10 ring-inset backdrop-blur-sm dark:from-background/50 dark:to-secondary/50 dark:ring-foreground/10", "[--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:running] [animation-timing-function:linear]", "shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]")} key={logo.label}>
                <image_1.default alt="" className="size-4" src={logo.src}/>
                <span className="font-medium text-foreground text-sm/6">
                  {logo.label}
                </span>
              </div>))}
          </div>))}
      </div>
    </div>
  </section>);
exports.Features = Features;
