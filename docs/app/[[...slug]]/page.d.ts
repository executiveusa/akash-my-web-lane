import type { Metadata } from "next";
type PageProps = {
    params: Promise<{
        slug?: string[];
    }>;
};
declare const Page: (props: PageProps) => Promise<import("react").JSX.Element>;
export declare const generateStaticParams: () => Promise<any>;
export declare function generateMetadata(props: {
    params: Promise<{
        slug?: string[];
    }>;
}): Promise<Metadata>;
export default Page;
//# sourceMappingURL=page.d.ts.map