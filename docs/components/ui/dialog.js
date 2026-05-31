"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Dialog({ ...props }) {
    return <radix_ui_1.Dialog.Root data-slot="dialog" {...props}/>;
}
function DialogTrigger({ ...props }) {
    return <radix_ui_1.Dialog.Trigger data-slot="dialog-trigger" {...props}/>;
}
function DialogPortal({ ...props }) {
    return <radix_ui_1.Dialog.Portal data-slot="dialog-portal" {...props}/>;
}
function DialogClose({ ...props }) {
    return <radix_ui_1.Dialog.Close data-slot="dialog-close" {...props}/>;
}
function DialogOverlay({ className, ...props }) {
    return (<radix_ui_1.Dialog.Overlay className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="dialog-overlay" {...props}/>);
}
function DialogContent({ className, children, ...props }) {
    return (<DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <radix_ui_1.Dialog.Content className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg", className)} data-slot="dialog-content" {...props}>
        {children}
        <radix_ui_1.Dialog.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
          <lucide_react_1.XIcon />
          <span className="sr-only">Close</span>
        </radix_ui_1.Dialog.Close>
      </radix_ui_1.Dialog.Content>
    </DialogPortal>);
}
function DialogHeader({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col gap-2 text-center sm:text-left", className)} data-slot="dialog-header" {...props}/>);
}
function DialogFooter({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} data-slot="dialog-footer" {...props}/>);
}
function DialogTitle({ className, ...props }) {
    return (<radix_ui_1.Dialog.Title className={(0, utils_1.cn)("font-semibold text-lg leading-none", className)} data-slot="dialog-title" {...props}/>);
}
function DialogDescription({ className, ...props }) {
    return (<radix_ui_1.Dialog.Description className={(0, utils_1.cn)("text-muted-foreground text-sm", className)} data-slot="dialog-description" {...props}/>);
}
