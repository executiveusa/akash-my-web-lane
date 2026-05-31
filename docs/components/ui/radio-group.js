"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function RadioGroup({ className, ...props }) {
    return (<radix_ui_1.RadioGroup.Root className={(0, utils_1.cn)("grid gap-3", className)} data-slot="radio-group" {...props}/>);
}
function RadioGroupItem({ className, ...props }) {
    return (<radix_ui_1.RadioGroup.Item className={(0, utils_1.cn)("aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40", className)} data-slot="radio-group-item" {...props}>
      <radix_ui_1.RadioGroup.Indicator className="relative flex items-center justify-center" data-slot="radio-group-indicator">
        <lucide_react_1.CircleIcon className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-primary"/>
      </radix_ui_1.RadioGroup.Indicator>
    </radix_ui_1.RadioGroup.Item>);
}
