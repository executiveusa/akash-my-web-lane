"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTA = void 0;
const button_1 = require("@repo/design-system/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const env_1 = require("@/env");
const CTA = ({ dictionary }) => (<div className="w-full bg-[#0d0d0d] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 rounded-md border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-6 text-center lg:p-14">
        <div className="flex flex-col gap-2">
          <h3 className="max-w-2xl text-3xl tracking-tighter md:text-5xl">{dictionary.web.home.cta.title}</h3>
          <p className="max-w-2xl text-lg leading-relaxed text-[#f2ece0]/70">{dictionary.web.home.cta.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button_1.Button asChild className="gap-4 border-[#f2ece0]/20 text-[#f2ece0]" variant="outline">
            <link_1.default href="/contact">
              {dictionary.web.global.primaryCta} <lucide_react_1.PhoneCall className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
          <button_1.Button asChild className="gap-4 bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#e2bf6a]">
            <link_1.default href={env_1.env.NEXT_PUBLIC_APP_URL}>
              {dictionary.web.home.cta.button} <lucide_react_1.MoveRight className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
        </div>
      </div>
    </div>
  </div>);
exports.CTA = CTA;
