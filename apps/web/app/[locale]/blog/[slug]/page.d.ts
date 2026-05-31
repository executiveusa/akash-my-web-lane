import type { Metadata } from "next";
type BlogPostProperties = {
    readonly params: Promise<{
        slug: string;
    }>;
};
export declare const generateMetadata: ({ params, }: BlogPostProperties) => Promise<Metadata>;
export declare const generateStaticParams: () => Promise<{
    slug: string;
}[]>;
declare const BlogPost: ({ params }: BlogPostProperties) => Promise<import("react").JSX.Element>;
export default BlogPost;
//# sourceMappingURL=page.d.ts.map