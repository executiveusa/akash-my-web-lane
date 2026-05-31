import { type VariantProps } from "class-variance-authority";
import type * as React from "react";
declare const badgeVariants: any;
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): any;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map