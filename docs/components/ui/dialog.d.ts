import { Dialog as DialogPrimitive } from "radix-ui";
import type * as React from "react";
declare function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): any;
declare function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): any;
declare function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): any;
declare function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): any;
declare function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): any;
declare function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>): any;
declare function DialogHeader({ className, ...props }: React.ComponentProps<"div">): any;
declare function DialogFooter({ className, ...props }: React.ComponentProps<"div">): any;
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): any;
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): any;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
//# sourceMappingURL=dialog.d.ts.map