"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sheet = Sheet;
exports.SheetTrigger = SheetTrigger;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetHeader = SheetHeader;
exports.SheetFooter = SheetFooter;
exports.SheetTitle = SheetTitle;
exports.SheetDescription = SheetDescription;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Sheet({ ...props }) {
    return <radix_ui_1.Dialog.Root data-slot="sheet" {...props}/>;
}
function SheetTrigger({ ...props }) {
    return <radix_ui_1.Dialog.Trigger data-slot="sheet-trigger" {...props}/>;
}
function SheetClose({ ...props }) {
    return <radix_ui_1.Dialog.Close data-slot="sheet-close" {...props}/>;
}
function SheetPortal({ ...props }) {
    return <radix_ui_1.Dialog.Portal data-slot="sheet-portal" {...props}/>;
}
function SheetOverlay({ className, ...props }) {
    return (<radix_ui_1.Dialog.Overlay className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="sheet-overlay" {...props}/>);
}
function SheetContent({ className, children, side = "right", ...props }) {
    return (<SheetPortal>
      <SheetOverlay />
      <radix_ui_1.Dialog.Content className={(0, utils_1.cn)("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className)} data-slot="sheet-content" {...props}>
        {children}
        <radix_ui_1.Dialog.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <lucide_react_1.XIcon className="size-4"/>
          <span className="sr-only">Close</span>
        </radix_ui_1.Dialog.Close>
      </radix_ui_1.Dialog.Content>
    </SheetPortal>);
}
function SheetHeader({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col gap-1.5 p-4", className)} data-slot="sheet-header" {...props}/>);
}
function SheetFooter({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("mt-auto flex flex-col gap-2 p-4", className)} data-slot="sheet-footer" {...props}/>);
}
function SheetTitle({ className, ...props }) {
    return (<radix_ui_1.Dialog.Title className={(0, utils_1.cn)("font-semibold text-foreground", className)} data-slot="sheet-title" {...props}/>);
}
function SheetDescription({ className, ...props }) {
    return (<radix_ui_1.Dialog.Description className={(0, utils_1.cn)("text-muted-foreground text-sm", className)} data-slot="sheet-description" {...props}/>);
}
