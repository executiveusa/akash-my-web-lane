"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = Label;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Label({ className, ...props }) {
    return (<radix_ui_1.Label.Root className={(0, utils_1.cn)("flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", className)} data-slot="label" {...props}/>);
}
