"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleVariants = void 0;
exports.Toggle = Toggle;
const class_variance_authority_1 = require("class-variance-authority");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
const toggleVariants = (0, class_variance_authority_1.cva)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-transparent",
            outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
        },
        size: {
            default: "h-9 min-w-9 px-2",
            sm: "h-8 min-w-8 px-1.5",
            lg: "h-10 min-w-10 px-2.5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
exports.toggleVariants = toggleVariants;
function Toggle({ className, variant, size, ...props }) {
    return (<radix_ui_1.Toggle.Root className={(0, utils_1.cn)(toggleVariants({ variant, size, className }))} data-slot="toggle" {...props}/>);
}
