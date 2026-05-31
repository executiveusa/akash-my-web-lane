"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const rauchg_jpg_1 = __importDefault(require("./rauchg.jpg"));
const vercel_jpg_1 = __importDefault(require("./vercel.jpg"));
const Review = () => (<section className="flex flex-col gap-8 p-8">
    <div className="flex items-center gap-2 text-muted-foreground">
      <lucide_react_1.MessageCircleIcon size={14}/>
      <small>Nice words</small>
    </div>
    <p className="max-w-3xl text-balance font-semibold text-xl tracking-tight sm:text-2xl">
      &ldquo;A production-grade, monorepo-first, full stack Next.js template.
      Very thoughtfully engineered and documented. Covers auth, DB & ORM,
      payments, docs, blog, o11y, analytics, emails, and even feature flags &
      dark mode.&rdquo;
    </p>
    <div className="space-between flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="-space-x-1 flex items-center">
          <image_1.default alt="" className="rounded-full ring-2 ring-background" height={24} src={rauchg_jpg_1.default} width={24}/>
          <image_1.default alt="" className="rounded-full ring-2 ring-background" height={24} src={vercel_jpg_1.default} width={24}/>
        </div>
        <p className="text-muted-foreground text-sm">
          <span className="font-medium">Guillermo Rauch</span>, CEO of Vercel
        </p>
      </div>
      <a href="https://x.com/rauchg/status/1853171412766466119" rel="noopener noreferrer" target="_blank">
        <svg fill="none" height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
          <title>X</title>
          <path clipRule="evenodd" d="m15.9455 23-5.5495-7.9099-6.94714 7.9099h-2.939094l8.582324-9.7689-8.582324-12.2311h7.545944l5.23029 7.45502 6.5533-7.45502h2.9391l-8.1841 9.3165 8.8971 12.6835zm3.273-2.23h-1.9787l-12.52169-17.54h1.97899l5.015 7.0232.8672 1.2187z" fill="currentColor" fillRule="evenodd"/>
        </svg>
      </a>
    </div>
  </section>);
exports.Review = Review;
