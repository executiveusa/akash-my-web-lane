"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
const lucide_react_1 = require("lucide-react");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Breadcrumb({ ...props }) {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props}/>;
}
function BreadcrumbList({ className, ...props }) {
    return (<ol className={(0, utils_1.cn)("flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5", className)} data-slot="breadcrumb-list" {...props}/>);
}
function BreadcrumbItem({ className, ...props }) {
    return (<li className={(0, utils_1.cn)("inline-flex items-center gap-1.5", className)} data-slot="breadcrumb-item" {...props}/>);
}
function BreadcrumbLink({ asChild, className, ...props }) {
    const Comp = asChild ? radix_ui_1.Slot.Slot : "a";
    return (<Comp className={(0, utils_1.cn)("transition-colors hover:text-foreground", className)} data-slot="breadcrumb-link" {...props}/>);
}
function BreadcrumbPage({ className, ...props }) {
    return (<span aria-current="page" aria-disabled="true" className={(0, utils_1.cn)("font-normal text-foreground", className)} data-slot="breadcrumb-page" role="link" {...props}/>);
}
function BreadcrumbSeparator({ children, className, ...props }) {
    return (<li aria-hidden="true" className={(0, utils_1.cn)("[&>svg]:size-3.5", className)} data-slot="breadcrumb-separator" role="presentation" {...props}>
      {children ?? <lucide_react_1.ChevronRight />}
    </li>);
}
function BreadcrumbEllipsis({ className, ...props }) {
    return (<span aria-hidden="true" className={(0, utils_1.cn)("flex size-9 items-center justify-center", className)} data-slot="breadcrumb-ellipsis" role="presentation" {...props}>
      <lucide_react_1.MoreHorizontal className="size-4"/>
      <span className="sr-only">More</span>
    </span>);
}
