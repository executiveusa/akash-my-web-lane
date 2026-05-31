"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = Progress;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Progress({ className, value, ...props }) {
    return (<radix_ui_1.Progress.Root className={(0, utils_1.cn)("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)} data-slot="progress" {...props}>
      <radix_ui_1.Progress.Indicator className="h-full w-full flex-1 bg-primary transition-all" data-slot="progress-indicator" style={{ transform: `translateX(-${100 - (value || 0)}%)` }}/>
    </radix_ui_1.Progress.Root>);
}
