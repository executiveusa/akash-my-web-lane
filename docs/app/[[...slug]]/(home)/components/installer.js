"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Installer = void 0;
const lucide_react_1 = require("lucide-react");
const sonner_1 = require("sonner");
const button_1 = require("@/components/ui/button");
const command = "npx next-forge@latest init";
const Installer = () => {
    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        sonner_1.toast.success("Copied to clipboard");
    };
    return (<div className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background py-2 pr-px pl-4 text-foreground text-sm shadow-sm">
      <p className="pointer-events-none shrink-0 select-none text-muted-foreground">
        $
      </p>
      <div className="flex-1 truncate text-left font-mono">{command}</div>
      <div className="flex shrink-0 items-center gap-2">
        <button_1.Button aria-label="Copy" className="rounded-[6px]" onClick={handleCopy} size="icon" variant="ghost">
          <lucide_react_1.CopyIcon className="text-muted-foreground" size={14}/>
        </button_1.Button>
      </div>
    </div>);
};
exports.Installer = Installer;
