import { type VariantProps } from "class-variance-authority";
import type * as React from "react";
declare const buttonVariants: any;
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): any;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map