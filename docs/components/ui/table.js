"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
exports.TableHeader = TableHeader;
exports.TableBody = TableBody;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableRow = TableRow;
exports.TableCell = TableCell;
exports.TableCaption = TableCaption;
const utils_1 = require("@/lib/utils");
function Table({ className, ...props }) {
    return (<div className="relative w-full overflow-x-auto" data-slot="table-container">
      <table className={(0, utils_1.cn)("w-full caption-bottom text-sm", className)} data-slot="table" {...props}/>
    </div>);
}
function TableHeader({ className, ...props }) {
    return (<thead className={(0, utils_1.cn)("[&_tr]:border-b", className)} data-slot="table-header" {...props}/>);
}
function TableBody({ className, ...props }) {
    return (<tbody className={(0, utils_1.cn)("[&_tr:last-child]:border-0", className)} data-slot="table-body" {...props}/>);
}
function TableFooter({ className, ...props }) {
    return (<tfoot className={(0, utils_1.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} data-slot="table-footer" {...props}/>);
}
function TableRow({ className, ...props }) {
    return (<tr className={(0, utils_1.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} data-slot="table-row" {...props}/>);
}
function TableHead({ className, ...props }) {
    return (<th className={(0, utils_1.cn)("h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)} data-slot="table-head" {...props}/>);
}
function TableCell({ className, ...props }) {
    return (<td className={(0, utils_1.cn)("whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)} data-slot="table-cell" {...props}/>);
}
function TableCaption({ className, ...props }) {
    return (<caption className={(0, utils_1.cn)("mt-4 text-muted-foreground text-sm", className)} data-slot="table-caption" {...props}/>);
}
