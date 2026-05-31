"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = Alert;
exports.AlertTitle = AlertTitle;
exports.AlertDescription = AlertDescription;
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("@/lib/utils");
const alertVariants = (0, class_variance_authority_1.cva)("relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground",
            destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
function Alert({ className, variant, ...props }) {
    return (<div className={(0, utils_1.cn)(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props}/>);
}
function AlertTitle({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)} data-slot="alert-title" {...props}/>);
}
function AlertDescription({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed", className)} data-slot="alert-description" {...props}/>);
}
