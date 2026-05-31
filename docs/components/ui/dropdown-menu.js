"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function DropdownMenu({ ...props }) {
    return <radix_ui_1.DropdownMenu.Root data-slot="dropdown-menu" {...props}/>;
}
function DropdownMenuPortal({ ...props }) {
    return (<radix_ui_1.DropdownMenu.Portal data-slot="dropdown-menu-portal" {...props}/>);
}
function DropdownMenuTrigger({ ...props }) {
    return (<radix_ui_1.DropdownMenu.Trigger data-slot="dropdown-menu-trigger" {...props}/>);
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    return (<radix_ui_1.DropdownMenu.Portal>
      <radix_ui_1.DropdownMenu.Content className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="dropdown-menu-content" sideOffset={sideOffset} {...props}/>
    </radix_ui_1.DropdownMenu.Portal>);
}
function DropdownMenuGroup({ ...props }) {
    return (<radix_ui_1.DropdownMenu.Group data-slot="dropdown-menu-group" {...props}/>);
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    return (<radix_ui_1.DropdownMenu.Item className={(0, utils_1.cn)("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-inset={inset} data-slot="dropdown-menu-item" data-variant={variant} {...props}/>);
}
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return (<radix_ui_1.DropdownMenu.CheckboxItem checked={checked} className={(0, utils_1.cn)("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-slot="dropdown-menu-checkbox-item" {...props}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <radix_ui_1.DropdownMenu.ItemIndicator>
          <lucide_react_1.CheckIcon className="size-4"/>
        </radix_ui_1.DropdownMenu.ItemIndicator>
      </span>
      {children}
    </radix_ui_1.DropdownMenu.CheckboxItem>);
}
function DropdownMenuRadioGroup({ ...props }) {
    return (<radix_ui_1.DropdownMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props}/>);
}
function DropdownMenuRadioItem({ className, children, ...props }) {
    return (<radix_ui_1.DropdownMenu.RadioItem className={(0, utils_1.cn)("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-slot="dropdown-menu-radio-item" {...props}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <radix_ui_1.DropdownMenu.ItemIndicator>
          <lucide_react_1.CircleIcon className="size-2 fill-current"/>
        </radix_ui_1.DropdownMenu.ItemIndicator>
      </span>
      {children}
    </radix_ui_1.DropdownMenu.RadioItem>);
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return (<radix_ui_1.DropdownMenu.Label className={(0, utils_1.cn)("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", className)} data-inset={inset} data-slot="dropdown-menu-label" {...props}/>);
}
function DropdownMenuSeparator({ className, ...props }) {
    return (<radix_ui_1.DropdownMenu.Separator className={(0, utils_1.cn)("-mx-1 my-1 h-px bg-border", className)} data-slot="dropdown-menu-separator" {...props}/>);
}
function DropdownMenuShortcut({ className, ...props }) {
    return (<span className={(0, utils_1.cn)("ml-auto text-muted-foreground text-xs tracking-widest", className)} data-slot="dropdown-menu-shortcut" {...props}/>);
}
function DropdownMenuSub({ ...props }) {
    return <radix_ui_1.DropdownMenu.Sub data-slot="dropdown-menu-sub" {...props}/>;
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (<radix_ui_1.DropdownMenu.SubTrigger className={(0, utils_1.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground", className)} data-inset={inset} data-slot="dropdown-menu-sub-trigger" {...props}>
      {children}
      <lucide_react_1.ChevronRightIcon className="ml-auto size-4"/>
    </radix_ui_1.DropdownMenu.SubTrigger>);
}
function DropdownMenuSubContent({ className, ...props }) {
    return (<radix_ui_1.DropdownMenu.SubContent className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="dropdown-menu-sub-content" {...props}/>);
}
