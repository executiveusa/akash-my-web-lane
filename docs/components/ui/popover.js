"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = Popover;
exports.PopoverTrigger = PopoverTrigger;
exports.PopoverContent = PopoverContent;
exports.PopoverAnchor = PopoverAnchor;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Popover({ ...props }) {
    return <radix_ui_1.Popover.Root data-slot="popover" {...props}/>;
}
function PopoverTrigger({ ...props }) {
    return <radix_ui_1.Popover.Trigger data-slot="popover-trigger" {...props}/>;
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
    return (<radix_ui_1.Popover.Portal>
      <radix_ui_1.Popover.Content align={align} className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="popover-content" sideOffset={sideOffset} {...props}/>
    </radix_ui_1.Popover.Portal>);
}
function PopoverAnchor({ ...props }) {
    return <radix_ui_1.Popover.Anchor data-slot="popover-anchor" {...props}/>;
}
