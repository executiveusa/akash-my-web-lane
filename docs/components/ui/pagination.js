"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
exports.PaginationContent = PaginationContent;
exports.PaginationLink = PaginationLink;
exports.PaginationItem = PaginationItem;
exports.PaginationPrevious = PaginationPrevious;
exports.PaginationNext = PaginationNext;
exports.PaginationEllipsis = PaginationEllipsis;
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
function Pagination({ className, ...props }) {
    return (<nav aria-label="pagination" className={(0, utils_1.cn)("mx-auto flex w-full justify-center", className)} data-slot="pagination" role="navigation" {...props}/>);
}
function PaginationContent({ className, ...props }) {
    return (<ul className={(0, utils_1.cn)("flex flex-row items-center gap-1", className)} data-slot="pagination-content" {...props}/>);
}
function PaginationItem({ ...props }) {
    return <li data-slot="pagination-item" {...props}/>;
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
    return (<a aria-current={isActive ? "page" : undefined} className={(0, utils_1.cn)((0, button_1.buttonVariants)({
            variant: isActive ? "outline" : "ghost",
            size,
        }), className)} data-active={isActive} data-slot="pagination-link" {...props}/>);
}
function PaginationPrevious({ className, ...props }) {
    return (<PaginationLink aria-label="Go to previous page" className={(0, utils_1.cn)("gap-1 px-2.5 sm:pl-2.5", className)} size="default" {...props}>
      <lucide_react_1.ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>);
}
function PaginationNext({ className, ...props }) {
    return (<PaginationLink aria-label="Go to next page" className={(0, utils_1.cn)("gap-1 px-2.5 sm:pr-2.5", className)} size="default" {...props}>
      <span className="hidden sm:block">Next</span>
      <lucide_react_1.ChevronRightIcon />
    </PaginationLink>);
}
function PaginationEllipsis({ className, ...props }) {
    return (<span aria-hidden className={(0, utils_1.cn)("flex size-9 items-center justify-center", className)} data-slot="pagination-ellipsis" {...props}>
      <lucide_react_1.MoreHorizontalIcon className="size-4"/>
      <span className="sr-only">More pages</span>
    </span>);
}
