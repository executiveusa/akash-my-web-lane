"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSource = void 0;
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const OpenSource = () => (<div className="flex h-full flex-col items-start justify-between gap-4 p-8">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <lucide_react_1.StarIcon size={14}/>
        <small>Open source</small>
      </div>
      <p className="font-semibold text-xl tracking-tight">
        next-forge is 100% open source, provided by{" "}
        <a className="text-primary underline" href="https://vercel.com" rel="noopener noreferrer" target="_blank">
          Vercel
        </a>{" "}
        and maintained by a community of developers. It was originally developed
        by{" "}
        <a className="text-primary underline" href="https://x.com/haydenbleasel" rel="noopener noreferrer" target="_blank">
          Hayden Bleasel
        </a>
        .
      </p>
    </div>
    <button_1.Button asChild variant="outline">
      <a href="https://github.com/vercel/next-forge" rel="noopener noreferrer" target="_blank">
        Browse the source code
      </a>
    </button_1.Button>
  </div>);
exports.OpenSource = OpenSource;
