import type * as React from "react";
import { type Button } from "@/components/ui/button";
declare function Pagination({ className, ...props }: React.ComponentProps<"nav">): any;
declare function PaginationContent({ className, ...props }: React.ComponentProps<"ul">): any;
declare function PaginationItem({ ...props }: React.ComponentProps<"li">): any;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> & React.ComponentProps<"a">;
declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): any;
declare function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>): any;
declare function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>): any;
declare function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">): any;
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
//# sourceMappingURL=pagination.d.ts.map