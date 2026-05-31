import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
declare function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): any;
declare function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>): any;
declare function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>): any;
declare function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>): any;
declare function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>): any;
declare function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>): any;
declare function DrawerHeader({ className, ...props }: React.ComponentProps<"div">): any;
declare function DrawerFooter({ className, ...props }: React.ComponentProps<"div">): any;
declare function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>): any;
declare function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>): any;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
//# sourceMappingURL=drawer.d.ts.map