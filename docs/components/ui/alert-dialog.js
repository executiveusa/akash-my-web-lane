"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = AlertDialog;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogTrigger = AlertDialogTrigger;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
const radix_ui_1 = require("radix-ui");
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
function AlertDialog({ ...props }) {
    return <radix_ui_1.AlertDialog.Root data-slot="alert-dialog" {...props}/>;
}
function AlertDialogTrigger({ ...props }) {
    return (<radix_ui_1.AlertDialog.Trigger data-slot="alert-dialog-trigger" {...props}/>);
}
function AlertDialogPortal({ ...props }) {
    return (<radix_ui_1.AlertDialog.Portal data-slot="alert-dialog-portal" {...props}/>);
}
function AlertDialogOverlay({ className, ...props }) {
    return (<radix_ui_1.AlertDialog.Overlay className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="alert-dialog-overlay" {...props}/>);
}
function AlertDialogContent({ className, ...props }) {
    return (<AlertDialogPortal>
      <AlertDialogOverlay />
      <radix_ui_1.AlertDialog.Content className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg", className)} data-slot="alert-dialog-content" {...props}/>
    </AlertDialogPortal>);
}
function AlertDialogHeader({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col gap-2 text-center sm:text-left", className)} data-slot="alert-dialog-header" {...props}/>);
}
function AlertDialogFooter({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} data-slot="alert-dialog-footer" {...props}/>);
}
function AlertDialogTitle({ className, ...props }) {
    return (<radix_ui_1.AlertDialog.Title className={(0, utils_1.cn)("font-semibold text-lg", className)} data-slot="alert-dialog-title" {...props}/>);
}
function AlertDialogDescription({ className, ...props }) {
    return (<radix_ui_1.AlertDialog.Description className={(0, utils_1.cn)("text-muted-foreground text-sm", className)} data-slot="alert-dialog-description" {...props}/>);
}
function AlertDialogAction({ className, ...props }) {
    return (<radix_ui_1.AlertDialog.Action className={(0, utils_1.cn)((0, button_1.buttonVariants)(), className)} {...props}/>);
}
function AlertDialogCancel({ className, ...props }) {
    return (<radix_ui_1.AlertDialog.Cancel className={(0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "outline" }), className)} {...props}/>);
}
