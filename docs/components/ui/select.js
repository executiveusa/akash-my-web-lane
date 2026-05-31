"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Select({ ...props }) {
    return <radix_ui_1.Select.Root data-slot="select" {...props}/>;
}
function SelectGroup({ ...props }) {
    return <radix_ui_1.Select.Group data-slot="select-group" {...props}/>;
}
function SelectValue({ ...props }) {
    return <radix_ui_1.Select.Value data-slot="select-value" {...props}/>;
}
function SelectTrigger({ className, size = "default", children, ...props }) {
    return (<radix_ui_1.Select.Trigger className={(0, utils_1.cn)("flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[size=default]:h-9 data-[size=sm]:h-8 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className)} data-size={size} data-slot="select-trigger" {...props}>
      {children}
      <radix_ui_1.Select.Icon asChild>
        <lucide_react_1.ChevronDownIcon className="size-4 opacity-50"/>
      </radix_ui_1.Select.Icon>
    </radix_ui_1.Select.Trigger>);
}
function SelectContent({ className, children, position = "popper", ...props }) {
    return (<radix_ui_1.Select.Portal>
      <radix_ui_1.Select.Content className={(0, utils_1.cn)("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in", position === "popper" &&
            "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1", className)} data-slot="select-content" position={position} {...props}>
        <SelectScrollUpButton />
        <radix_ui_1.Select.Viewport className={(0, utils_1.cn)("p-1", position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1")}>
          {children}
        </radix_ui_1.Select.Viewport>
        <SelectScrollDownButton />
      </radix_ui_1.Select.Content>
    </radix_ui_1.Select.Portal>);
}
function SelectLabel({ className, ...props }) {
    return (<radix_ui_1.Select.Label className={(0, utils_1.cn)("px-2 py-1.5 text-muted-foreground text-xs", className)} data-slot="select-label" {...props}/>);
}
function SelectItem({ className, children, ...props }) {
    return (<radix_ui_1.Select.Item className={(0, utils_1.cn)("relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className)} data-slot="select-item" {...props}>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <radix_ui_1.Select.ItemIndicator>
          <lucide_react_1.CheckIcon className="size-4"/>
        </radix_ui_1.Select.ItemIndicator>
      </span>
      <radix_ui_1.Select.ItemText>{children}</radix_ui_1.Select.ItemText>
    </radix_ui_1.Select.Item>);
}
function SelectSeparator({ className, ...props }) {
    return (<radix_ui_1.Select.Separator className={(0, utils_1.cn)("-mx-1 pointer-events-none my-1 h-px bg-border", className)} data-slot="select-separator" {...props}/>);
}
function SelectScrollUpButton({ className, ...props }) {
    return (<radix_ui_1.Select.ScrollUpButton className={(0, utils_1.cn)("flex cursor-default items-center justify-center py-1", className)} data-slot="select-scroll-up-button" {...props}>
      <lucide_react_1.ChevronUpIcon className="size-4"/>
    </radix_ui_1.Select.ScrollUpButton>);
}
function SelectScrollDownButton({ className, ...props }) {
    return (<radix_ui_1.Select.ScrollDownButton className={(0, utils_1.cn)("flex cursor-default items-center justify-center py-1", className)} data-slot="select-scroll-down-button" {...props}>
      <lucide_react_1.ChevronDownIcon className="size-4"/>
    </radix_ui_1.Select.ScrollDownButton>);
}
