"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationMenuTriggerStyle = void 0;
exports.NavigationMenu = NavigationMenu;
exports.NavigationMenuList = NavigationMenuList;
exports.NavigationMenuItem = NavigationMenuItem;
exports.NavigationMenuContent = NavigationMenuContent;
exports.NavigationMenuTrigger = NavigationMenuTrigger;
exports.NavigationMenuLink = NavigationMenuLink;
exports.NavigationMenuIndicator = NavigationMenuIndicator;
exports.NavigationMenuViewport = NavigationMenuViewport;
const class_variance_authority_1 = require("class-variance-authority");
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function NavigationMenu({ className, children, viewport = true, ...props }) {
    return (<radix_ui_1.NavigationMenu.Root className={(0, utils_1.cn)("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)} data-slot="navigation-menu" data-viewport={viewport} {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </radix_ui_1.NavigationMenu.Root>);
}
function NavigationMenuList({ className, ...props }) {
    return (<radix_ui_1.NavigationMenu.List className={(0, utils_1.cn)("group flex flex-1 list-none items-center justify-center gap-1", className)} data-slot="navigation-menu-list" {...props}/>);
}
function NavigationMenuItem({ className, ...props }) {
    return (<radix_ui_1.NavigationMenu.Item className={(0, utils_1.cn)("relative", className)} data-slot="navigation-menu-item" {...props}/>);
}
const navigationMenuTriggerStyle = (0, class_variance_authority_1.cva)("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:hover:bg-accent");
exports.navigationMenuTriggerStyle = navigationMenuTriggerStyle;
function NavigationMenuTrigger({ className, children, ...props }) {
    return (<radix_ui_1.NavigationMenu.Trigger className={(0, utils_1.cn)(navigationMenuTriggerStyle(), "group", className)} data-slot="navigation-menu-trigger" {...props}>
      {children}{" "}
      <lucide_react_1.ChevronDownIcon aria-hidden="true" className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"/>
    </radix_ui_1.NavigationMenu.Trigger>);
}
function NavigationMenuContent({ className, ...props }) {
    return (<radix_ui_1.NavigationMenu.Content className={(0, utils_1.cn)("data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in", className)} data-slot="navigation-menu-content" {...props}/>);
}
function NavigationMenuViewport({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <radix_ui_1.NavigationMenu.Viewport className={(0, utils_1.cn)("data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]", className)} data-slot="navigation-menu-viewport" {...props}/>
    </div>);
}
function NavigationMenuLink({ className, ...props }) {
    return (<radix_ui_1.NavigationMenu.Link className={(0, utils_1.cn)("flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className)} data-slot="navigation-menu-link" {...props}/>);
}
function NavigationMenuIndicator({ className, ...props }) {
    return (<radix_ui_1.NavigationMenu.Indicator className={(0, utils_1.cn)("data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in", className)} data-slot="navigation-menu-indicator" {...props}>
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"/>
    </radix_ui_1.NavigationMenu.Indicator>);
}
