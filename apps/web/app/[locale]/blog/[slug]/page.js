"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = exports.generateMetadata = void 0;
const react_icons_1 = require("@radix-ui/react-icons");
const cms_1 = require("@repo/cms");
const body_1 = require("@repo/cms/components/body");
const code_block_1 = require("@repo/cms/components/code-block");
const feed_1 = require("@repo/cms/components/feed");
const image_1 = require("@repo/cms/components/image");
const toc_1 = require("@repo/cms/components/toc");
const json_ld_1 = require("@repo/seo/json-ld");
const metadata_1 = require("@repo/seo/metadata");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const sidebar_1 = require("@/components/sidebar");
const env_1 = require("@/env");
const protocol = env_1.env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith("https")
    ? "https"
    : "http";
const url = new URL(`${protocol}://${env_1.env.VERCEL_PROJECT_PRODUCTION_URL}`);
const generateMetadata = async ({ params, }) => {
    const { slug } = await params;
    const post = await cms_1.blog.getPost(slug);
    if (!post) {
        return {};
    }
    // @ts-ignore
    const anyPost = post;
    return (0, metadata_1.createMetadata)({
        title: anyPost._title,
        description: anyPost.description ?? anyPost._title,
        image: anyPost.image?.url,
    });
};
exports.generateMetadata = generateMetadata;
const generateStaticParams = async () => {
    const posts = await cms_1.blog.getPosts();
    return posts.map(({ _slug }) => ({ slug: _slug }));
};
exports.generateStaticParams = generateStaticParams;
const BlogPost = async ({ params }) => {
    const { slug } = await params;
    return (<feed_1.Feed queries={[cms_1.blog.postQuery(slug)]}>
      {/* biome-ignore lint/suspicious/useAwait: "Server Actions must be async" */}
      {async ([data]) => {
            "use server";
            const page = data.blog.posts.item;
            if (!page) {
                (0, navigation_1.notFound)();
            }
            return (<>
            <json_ld_1.JsonLd code={{
                    "@type": "BlogPosting",
                    "@context": "https://schema.org",
                    datePublished: page.date,
                    description: page.description,
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": new URL(`/blog/${page._slug}`, url).toString(),
                    },
                    headline: page._title,
                    image: page.image.url,
                    dateModified: page.date,
                    author: page.authors.at(0)?._title,
                    isAccessibleForFree: true,
                }}/>
            <div className="container mx-auto py-16">
              <link_1.default className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none" href="/blog">
                <react_icons_1.ArrowLeftIcon className="h-4 w-4"/>
                Back to Blog
              </link_1.default>
              <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
                <div className="sm:flex-1">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <h1 className="scroll-m-20 text-balance font-extrabold text-4xl tracking-tight lg:text-5xl">
                      {page._title}
                    </h1>
                    <p className="text-balance leading-7 [&:not(:first-child)]:mt-6">
                      {page.description}
                    </p>
                    {page.image ? (<image_1.Image alt={page.image.alt ?? ""} className="my-16 h-full w-full rounded-xl" height={page.image.height} priority src={page.image.url} width={page.image.width}/>) : undefined}
                    <div className="mx-auto max-w-prose">
                      <body_1.Body components={{
                    pre: ({ code, language }) => (<code_block_1.CodeBlock snippets={[{ code, language }]} theme="vesper"/>),
                }} content={page.body.json.content}/>
                    </div>
                  </div>
                </div>
                <div className="sticky top-24 hidden shrink-0 md:block">
                  <sidebar_1.Sidebar date={new Date(page.date)} readingTime={`${page.body.readingTime} min read`} toc={<toc_1.TableOfContents data={page.body.json.toc}/>}/>
                </div>
              </div>
            </div>
          </>);
        }}
    </feed_1.Feed>);
};
exports.default = BlogPost;
