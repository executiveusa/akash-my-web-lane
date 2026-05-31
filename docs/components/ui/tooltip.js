"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = Tooltip;
exports.TooltipTrigger = TooltipTrigger;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function TooltipProvider({ delayDuration = 0, ...props }) {
    return (<radix_ui_1.Tooltip.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props}/>);
}
function Tooltip({ ...props }) {
    return (<TooltipProvider>
      <radix_ui_1.Tooltip.Root data-slot="tooltip" {...props}/>
    </TooltipProvider>);
}
function TooltipTrigger({ ...props }) {
    return <radix_ui_1.Tooltip.Trigger data-slot="tooltip-trigger" {...props}/>;
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return (<radix_ui_1.Tooltip.Portal>
      <radix_ui_1.Tooltip.Content className={(0, utils_1.cn)("fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out", className)} data-slot="tooltip-content" sideOffset={sideOffset} {...props}>
        {children}
        <radix_ui_1.Tooltip.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary"/>
      </radix_ui_1.Tooltip.Content>
    </radix_ui_1.Tooltip.Portal>);
}
