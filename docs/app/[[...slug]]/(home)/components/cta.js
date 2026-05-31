"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallToAction = void 0;
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const installer_1 = require("./installer");
const CallToAction = () => (<footer className="flex flex-col items-center justify-center gap-8 px-8 py-16 sm:py-24">
    <div className="inline-flex rounded-full border bg-secondary px-4 py-1.5 font-medium text-sm shadow-sm">
      Get started
    </div>
    <p className="text-center font-semibold text-3xl leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
      Ready to build something amazing? <br className="hidden sm:block"/>
      Clone this repo and start building.
    </p>
    <div className="mx-auto flex max-w-full flex-col items-center justify-center gap-2 sm:max-w-lg sm:flex-row">
      <installer_1.Installer />
      <button_1.Button asChild size="lg">
        <link_1.default href="/docs">Read the docs</link_1.default>
      </button_1.Button>
    </div>
  </footer>);
exports.CallToAction = CallToAction;
