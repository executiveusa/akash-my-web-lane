import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TooltipContent } from "@/components/ui/tooltip";
declare function useSidebar(): any;
declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): any;
declare function Sidebar({ side, variant, collapsible, className, children, ...props }: React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}): any;
declare function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>): any;
declare function SidebarRail({ className, ...props }: React.ComponentProps<"button">): any;
declare function SidebarInset({ className, ...props }: React.ComponentProps<"main">): any;
declare function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>): any;
declare function SidebarHeader({ className, ...props }: React.ComponentProps<"div">): any;
declare function SidebarFooter({ className, ...props }: React.ComponentProps<"div">): any;
declare function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): any;
declare function SidebarContent({ className, ...props }: React.ComponentProps<"div">): any;
declare function SidebarGroup({ className, ...props }: React.ComponentProps<"div">): any;
declare function SidebarGroupLabel({ className, asChild, ...props }: React.ComponentProps<"div"> & {
    asChild?: boolean;
}): any;
declare function SidebarGroupAction({ className, asChild, ...props }: React.ComponentProps<"button"> & {
    asChild?: boolean;
}): any;
declare function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">): any;
declare function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">): any;
declare function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">): any;
declare const sidebarMenuButtonVariants: any;
declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, ...props }: React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): any;
declare function SidebarMenuAction({ className, asChild, showOnHover, ...props }: React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
}): any;
declare function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">): any;
declare function SidebarMenuSkeleton({ className, showIcon, ...props }: React.ComponentProps<"div"> & {
    showIcon?: boolean;
}): any;
declare function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">): any;
declare function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">): any;
declare function SidebarMenuSubButton({ asChild, size, isActive, className, ...props }: React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}): any;
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, };
//# sourceMappingURL=sidebar.d.ts.map