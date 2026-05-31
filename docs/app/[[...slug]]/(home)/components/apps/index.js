"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apps = void 0;
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const utils_1 = require("@/lib/utils");
const api_png_1 = __importDefault(require("./api.png"));
const app_png_1 = __importDefault(require("./app.png"));
const docs_png_1 = __importDefault(require("./docs.png"));
const email_png_1 = __importDefault(require("./email.png"));
const storybook_png_1 = __importDefault(require("./storybook.png"));
const studio_png_1 = __importDefault(require("./studio.png"));
const web_png_1 = __importDefault(require("./web.png"));
const apps = [
    {
        icon: lucide_react_1.LaptopIcon,
        name: "app",
        title: "Lightning-fast app template",
        description: "Start building your app with a shadcn/ui template that's already set up with everything you need — Tailwind, Clerk and more.",
        image: app_png_1.default,
    },
    {
        icon: lucide_react_1.ServerIcon,
        name: "api",
        title: "Cross-platform API",
        description: "Create an API microservice for many different apps, with a type-safe database ORM and webhook handlers.",
        image: api_png_1.default,
    },
    {
        icon: lucide_react_1.MailIcon,
        name: "email",
        title: "React-based email templates",
        description: "Create and preview email templates with a React-based email library, then send them with a simple API powered by Resend.",
        image: email_png_1.default,
    },
    {
        icon: lucide_react_1.GlobeIcon,
        name: "web",
        title: "Robust, type-safe website",
        description: "A twblocks website template with a type-safe blog, bulletproof SEO and legal pages, powered by BaseHub.",
        image: web_png_1.default,
    },
    {
        icon: lucide_react_1.BookIcon,
        name: "docs",
        title: "Stunning documentation",
        description: "Simple, beautiful out of the box and easy to maintain documentation. Pages are automatically generated from your markdown files.",
        image: docs_png_1.default,
    },
    {
        icon: lucide_react_1.DatabaseIcon,
        name: "studio",
        title: "Visual database editor",
        description: "Use Prisma to generate a type-safe client for your database, and Prisma Studio to visualize and edit it.",
        image: studio_png_1.default,
    },
    {
        icon: lucide_react_1.CurlyBracesIcon,
        name: "storybook",
        title: "A frontend workshop",
        description: "Built-in Storybook instance, allowing you to create reusable components and pages that can be tested and previewed in isolation.",
        image: storybook_png_1.default,
    },
];
const App = ({ app }) => (<div className="relative flex flex-col gap-8 overflow-hidden p-8 pb-0">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <app.icon size={14}/>
        <small>/apps/{app.name}</small>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl sm:truncate">{app.title}</h2>
        <p className="text-balance text-muted-foreground sm:line-clamp-2">
          {app.description}
        </p>
      </div>
    </div>
    <div className="h-48 overflow-hidden md:h-80">
      <image_1.default alt="" className="h-auto w-full overflow-hidden rounded-md border object-cover object-left shadow-sm" src={app.image}/>
    </div>
  </div>);
const Apps = () => (<section className="grid sm:grid-cols-2" id="apps">
    {apps.map((app, index) => (<div className={(0, utils_1.cn)(index % 2 && "sm:border-l", index > 0 && "border-t sm:border-t-0", index > 1 && "!border-t")} key={index}>
        <App app={app}/>
      </div>))}
    {apps.length % 2 === 1 && (<div className="h-full w-full border-t border-l bg-dashed"/>)}
  </section>);
exports.Apps = Apps;
