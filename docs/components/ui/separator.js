"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = Separator;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
    return (<radix_ui_1.Separator.Root className={(0, utils_1.cn)("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px", className)} data-slot="separator-root" decorative={decorative} orientation={orientation} {...props}/>);
}
