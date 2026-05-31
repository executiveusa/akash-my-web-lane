import type { ReactNode } from "react";
type SidebarProperties = {
    readonly date: Date;
    readonly readingTime: string;
    readonly tags?: string[];
    readonly toc?: ReactNode;
};
export declare const Sidebar: ({ date, readingTime, tags, toc: Toc, }: SidebarProperties) => Promise<import("react").JSX.Element>;
export {};
//# sourceMappingURL=sidebar.d.ts.map