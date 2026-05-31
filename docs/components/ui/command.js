"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = Command;
exports.CommandDialog = CommandDialog;
exports.CommandInput = CommandInput;
exports.CommandList = CommandList;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandItem = CommandItem;
exports.CommandShortcut = CommandShortcut;
exports.CommandSeparator = CommandSeparator;
const cmdk_1 = require("cmdk");
const lucide_react_1 = require("lucide-react");
const dialog_1 = require("@/components/ui/dialog");
const utils_1 = require("@/lib/utils");
function Command({ className, ...props }) {
    return (<cmdk_1.Command className={(0, utils_1.cn)("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)} data-slot="command" {...props}/>);
}
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, ...props }) {
    return (<dialog_1.Dialog {...props}>
      <dialog_1.DialogHeader className="sr-only">
        <dialog_1.DialogTitle>{title}</dialog_1.DialogTitle>
        <dialog_1.DialogDescription>{description}</dialog_1.DialogDescription>
      </dialog_1.DialogHeader>
      <dialog_1.DialogContent className="overflow-hidden p-0">
        <Command className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
function CommandInput({ className, ...props }) {
    return (<div className="flex h-9 items-center gap-2 border-b px-3" data-slot="command-input-wrapper">
      <lucide_react_1.SearchIcon className="size-4 shrink-0 opacity-50"/>
      <cmdk_1.Command.Input className={(0, utils_1.cn)("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} data-slot="command-input" {...props}/>
    </div>);
}
function CommandList({ className, ...props }) {
    return (<cmdk_1.Command.List className={(0, utils_1.cn)("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className)} data-slot="command-list" {...props}/>);
}
function CommandEmpty({ ...props }) {
    return (<cmdk_1.Command.Empty className="py-6 text-center text-sm" data-slot="command-empty" {...props}/>);
}
function CommandGroup({ className, ...props }) {
    return (<cmdk_1.Command.Group className={(0, utils_1.cn)("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs", className)} data-slot="command-group" {...props}/>);
}
function CommandSeparator({ className, ...props }) {
    return (<cmdk_1.Command.Separator className={(0, utils_1.cn)("-mx-1 h-px bg-border", className)} data-slot="command-separator" {...props}/>);
}
function CommandItem({ className, ...props }) {
    return (<cmdk_1.Command.Item className={(0, utils_1.cn)("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-slot="command-item" {...props}/>);
}
function CommandShortcut({ className, ...props }) {
    return (<span className={(0, utils_1.cn)("ml-auto text-muted-foreground text-xs tracking-widest", className)} data-slot="command-shortcut" {...props}/>);
}
