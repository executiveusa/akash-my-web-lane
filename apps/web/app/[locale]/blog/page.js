"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetadata = void 0;
const cms_1 = require("@repo/cms");
const feed_1 = require("@repo/cms/components/feed");
const image_1 = require("@repo/cms/components/image");
const utils_1 = require("@repo/design-system/lib/utils");
const internationalization_1 = require("@repo/internationalization");
const json_ld_1 = require("@repo/seo/json-ld");
const metadata_1 = require("@repo/seo/metadata");
const link_1 = __importDefault(require("next/link"));
const generateMetadata = async ({ params, }) => {
    const { locale } = await params;
    const dictionary = await (0, internationalization_1.getDictionary)(locale);
    return (0, metadata_1.createMetadata)(dictionary.web.blog.meta);
};
exports.generateMetadata = generateMetadata;
const BlogIndex = async ({ params }) => {
    const { locale } = await params;
    const dictionary = await (0, internationalization_1.getDictionary)(locale);
    const jsonLd = {
        "@type": "Blog",
        "@context": "https://schema.org",
    };
    return (<>
      <json_ld_1.JsonLd code={jsonLd}/>
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
              {dictionary.web.blog.meta.title}
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <feed_1.Feed queries={[cms_1.blog.postsQuery]}>
              {async ([data]) => {
            "use server";
            if (!data.blog.posts.items.length) {
                return null;
            }
            return data.blog.posts.items.map((post, index) => (<link_1.default className={(0, utils_1.cn)("flex cursor-pointer flex-col gap-4 hover:opacity-75", !index && "md:col-span-2")} href={`/blog/${post._slug}`} key={post._slug}>
                    <image_1.Image alt={post.image.alt ?? ""} height={post.image.height} src={post.image.url} width={post.image.width}/>
                    <div className="flex flex-row items-center gap-4">
                      <p className="text-muted-foreground text-sm">
                        {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="max-w-3xl text-4xl tracking-tight">
                        {post._title}
                      </h3>
                      <p className="max-w-3xl text-base text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </link_1.default>));
        }}
            </feed_1.Feed>
          </div>
        </div>
      </div>
    </>);
};
exports.default = BlogIndex;
