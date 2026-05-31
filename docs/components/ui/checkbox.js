"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = Checkbox;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Checkbox({ className, ...props }) {
    return (<radix_ui_1.Checkbox.Root className={(0, utils_1.cn)("peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40", className)} data-slot="checkbox" {...props}>
      <radix_ui_1.Checkbox.Indicator className="flex items-center justify-center text-current transition-none" data-slot="checkbox-indicator">
        <lucide_react_1.CheckIcon className="size-3.5"/>
      </radix_ui_1.Checkbox.Indicator>
    </radix_ui_1.Checkbox.Root>);
}
