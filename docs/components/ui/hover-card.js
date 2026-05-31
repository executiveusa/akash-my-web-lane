"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverCard = HoverCard;
exports.HoverCardTrigger = HoverCardTrigger;
exports.HoverCardContent = HoverCardContent;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function HoverCard({ ...props }) {
    return <radix_ui_1.HoverCard.Root data-slot="hover-card" {...props}/>;
}
function HoverCardTrigger({ ...props }) {
    return (<radix_ui_1.HoverCard.Trigger data-slot="hover-card-trigger" {...props}/>);
}
function HoverCardContent({ className, align = "center", sideOffset = 4, ...props }) {
    return (<radix_ui_1.HoverCard.Portal data-slot="hover-card-portal">
      <radix_ui_1.HoverCard.Content align={align} className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="hover-card-content" sideOffset={sideOffset} {...props}/>
    </radix_ui_1.HoverCard.Portal>);
}
