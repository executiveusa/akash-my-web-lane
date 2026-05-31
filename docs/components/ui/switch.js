"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = Switch;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Switch({ className, ...props }) {
    return (<radix_ui_1.Switch.Root className={(0, utils_1.cn)("peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80", className)} data-slot="switch" {...props}>
      <radix_ui_1.Switch.Thumb className={(0, utils_1.cn)("pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground")} data-slot="switch-thumb"/>
    </radix_ui_1.Switch.Root>);
}
