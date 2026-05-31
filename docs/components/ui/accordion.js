"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accordion = Accordion;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.AccordionContent = AccordionContent;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Accordion({ ...props }) {
    return <radix_ui_1.Accordion.Root data-slot="accordion" {...props}/>;
}
function AccordionItem({ className, ...props }) {
    return (<radix_ui_1.Accordion.Item className={(0, utils_1.cn)("border-b last:border-b-0", className)} data-slot="accordion-item" {...props}/>);
}
function AccordionTrigger({ className, children, ...props }) {
    return (<radix_ui_1.Accordion.Header className="flex">
      <radix_ui_1.Accordion.Trigger className={(0, utils_1.cn)("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className)} data-slot="accordion-trigger" {...props}>
        {children}
        <lucide_react_1.ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"/>
      </radix_ui_1.Accordion.Trigger>
    </radix_ui_1.Accordion.Header>);
}
function AccordionContent({ className, children, ...props }) {
    return (<radix_ui_1.Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" data-slot="accordion-content" {...props}>
      <div className={(0, utils_1.cn)("pt-0 pb-4", className)}>{children}</div>
    </radix_ui_1.Accordion.Content>);
}
