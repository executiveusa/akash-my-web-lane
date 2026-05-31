"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
exports.CardHeader = CardHeader;
exports.CardFooter = CardFooter;
exports.CardTitle = CardTitle;
exports.CardAction = CardAction;
exports.CardDescription = CardDescription;
exports.CardContent = CardContent;
const utils_1 = require("@/lib/utils");
function Card({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm", className)} data-slot="card" {...props}/>);
}
function CardHeader({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className)} data-slot="card-header" {...props}/>);
}
function CardTitle({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("font-semibold leading-none", className)} data-slot="card-title" {...props}/>);
}
function CardDescription({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("text-muted-foreground text-sm", className)} data-slot="card-description" {...props}/>);
}
function CardAction({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} data-slot="card-action" {...props}/>);
}
function CardContent({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("px-6", className)} data-slot="card-content" {...props}/>);
}
function CardFooter({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex items-center px-6 [.border-t]:pt-6", className)} data-slot="card-footer" {...props}/>);
}
