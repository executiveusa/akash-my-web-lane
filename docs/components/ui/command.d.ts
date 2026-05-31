import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";
import { Dialog } from "@/components/ui/dialog";
declare function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>): any;
declare function CommandDialog({ title, description, children, ...props }: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
}): any;
declare function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>): any;
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): any;
declare function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>): any;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): any;
declare function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>): any;
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): any;
declare function CommandShortcut({ className, ...props }: React.ComponentProps<"span">): any;
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
//# sourceMappingURL=command.d.ts.map