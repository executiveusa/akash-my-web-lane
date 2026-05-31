"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menubar = Menubar;
exports.MenubarPortal = MenubarPortal;
exports.MenubarMenu = MenubarMenu;
exports.MenubarTrigger = MenubarTrigger;
exports.MenubarContent = MenubarContent;
exports.MenubarGroup = MenubarGroup;
exports.MenubarSeparator = MenubarSeparator;
exports.MenubarLabel = MenubarLabel;
exports.MenubarItem = MenubarItem;
exports.MenubarShortcut = MenubarShortcut;
exports.MenubarCheckboxItem = MenubarCheckboxItem;
exports.MenubarRadioGroup = MenubarRadioGroup;
exports.MenubarRadioItem = MenubarRadioItem;
exports.MenubarSub = MenubarSub;
exports.MenubarSubTrigger = MenubarSubTrigger;
exports.MenubarSubContent = MenubarSubContent;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Menubar({ className, ...props }) {
    return (<radix_ui_1.Menubar.Root className={(0, utils_1.cn)("flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs", className)} data-slot="menubar" {...props}/>);
}
function MenubarMenu({ ...props }) {
    return <radix_ui_1.Menubar.Menu data-slot="menubar-menu" {...props}/>;
}
function MenubarGroup({ ...props }) {
    return <radix_ui_1.Menubar.Group data-slot="menubar-group" {...props}/>;
}
function MenubarPortal({ ...props }) {
    return <radix_ui_1.Menubar.Portal data-slot="menubar-portal" {...props}/>;
}
function MenubarRadioGroup({ ...props }) {
    return (<radix_ui_1.Menubar.RadioGroup data-slot="menubar-radio-group" {...props}/>);
}
function MenubarTrigger({ className, ...props }) {
    return (<radix_ui_1.Menubar.Trigger className={(0, utils_1.cn)("flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)} data-slot="menubar-trigger" {...props}/>);
}
function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
    return (<MenubarPortal>
      <radix_ui_1.Menubar.Content align={align} alignOffset={alignOffset} className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in", className)} data-slot="menubar-content" sideOffset={sideOffset} {...props}/>
    </MenubarPortal>);
}
function MenubarItem({ className, inset, variant = "default", ...props }) {
    return (<radix_ui_1.Menubar.Item className={(0, utils_1.cn)("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-inset={inset} data-slot="menubar-item" data-variant={variant} {...props}/>);
}
function MenubarCheckboxItem({ className, children, checked, ...props }) {
    return (<radix_ui_1.Menubar.CheckboxItem checked={checked} className={(0, utils_1.cn)("relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-slot="menubar-checkbox-item" {...props}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <radix_ui_1.Menubar.ItemIndicator>
          <lucide_react_1.CheckIcon className="size-4"/>
        </radix_ui_1.Menubar.ItemIndicator>
      </span>
      {children}
    </radix_ui_1.Menubar.CheckboxItem>);
}
function MenubarRadioItem({ className, children, ...props }) {
    return (<radix_ui_1.Menubar.RadioItem className={(0, utils_1.cn)("relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-slot="menubar-radio-item" {...props}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <radix_ui_1.Menubar.ItemIndicator>
          <lucide_react_1.CircleIcon className="size-2 fill-current"/>
        </radix_ui_1.Menubar.ItemIndicator>
      </span>
      {children}
    </radix_ui_1.Menubar.RadioItem>);
}
function MenubarLabel({ className, inset, ...props }) {
    return (<radix_ui_1.Menubar.Label className={(0, utils_1.cn)("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", className)} data-inset={inset} data-slot="menubar-label" {...props}/>);
}
function MenubarSeparator({ className, ...props }) {
    return (<radix_ui_1.Menubar.Separator className={(0, utils_1.cn)("-mx-1 my-1 h-px bg-border", className)} data-slot="menubar-separator" {...props}/>);
}
function MenubarShortcut({ className, ...props }) {
    return (<span className={(0, utils_1.cn)("ml-auto text-muted-foreground text-xs tracking-widest", className)} data-slot="menubar-shortcut" {...props}/>);
}
function MenubarSub({ ...props }) {
    return <radix_ui_1.Menubar.Sub data-slot="menubar-sub" {...props}/>;
}
function MenubarSubTrigger({ className, inset, children, ...props }) {
    return (<radix_ui_1.Menubar.SubTrigger className={(0, utils_1.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground", className)} data-inset={inset} data-slot="menubar-sub-trigger" {...props}>
      {children}
      <lucide_react_1.ChevronRightIcon className="ml-auto h-4 w-4"/>
    </radix_ui_1.Menubar.SubTrigger>);
}
function MenubarSubContent({ className, ...props }) {
    return (<radix_ui_1.Menubar.SubContent className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in", className)} data-slot="menubar-sub-content" {...props}/>);
}
