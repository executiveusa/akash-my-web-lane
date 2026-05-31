"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = void 0;
exports.generateMetadata = generateMetadata;
const notebook_1 = require("fumadocs-ui/layouts/notebook");
const mdx_1 = require("fumadocs-ui/mdx");
const page_1 = require("fumadocs-ui/page");
const navigation_1 = require("next/navigation");
const page_actions_1 = require("@/components/page-actions");
const mdx_components_1 = require("@/mdx-components");
const source_1 = require("../../lib/source");
const layout_config_1 = require("../layout.config");
const _home_1 = __importDefault(require("./(home)"));
const Page = async (props) => {
    const params = await props.params;
    const page = source_1.source.getPage(params.slug);
    if (!params.slug) {
        return (<notebook_1.DocsLayout {...layout_config_1.baseOptions} containerProps={{ className: "landing-page" }} nav={{ ...layout_config_1.baseOptions.nav, mode: "top" }} sidebar={{ hidden: true, collapsible: false }} tree={source_1.source.pageTree}>
        <_home_1.default />
      </notebook_1.DocsLayout>);
    }
    if (!page) {
        (0, navigation_1.notFound)();
    }
    const MDX = page.data.body;
    return (<notebook_1.DocsLayout {...layout_config_1.baseOptions} nav={{
            ...layout_config_1.baseOptions.nav,
            mode: "top",
        }} sidebar={{
            collapsible: false,
            tabs: [
                {
                    title: "Docs",
                    url: "/docs",
                },
                {
                    title: "Apps",
                    url: "/apps",
                },
                {
                    title: "Packages",
                    url: "/packages",
                },
                {
                    title: "Migrations",
                    url: "/migrations",
                },
                {
                    title: "Addons",
                    url: "/addons",
                },
            ],
        }} tabMode="navbar" tree={source_1.source.pageTree}>
      <page_1.DocsPage full={page.data.full} tableOfContent={{ style: "clerk" }} toc={page.data.toc}>
        <page_1.DocsTitle>{page.data.title}</page_1.DocsTitle>
        <page_1.DocsDescription>{page.data.description}</page_1.DocsDescription>
        <div className="flex flex-row items-center gap-2 border-b pt-2 pb-6">
          <page_actions_1.LLMCopyButton markdownUrl={`${page.url}.mdx`}/>
          <page_actions_1.ViewOptions githubUrl={`https://github.com/haydenbleasel/next-forge/blob/main/docs/content/docs/${page.file.path}`} markdownUrl={`${page.url}.mdx`}/>
        </div>
        <page_1.DocsBody>
          <MDX components={(0, mdx_components_1.getMDXComponents)({
            // this allows you to link to other pages with relative file paths
            a: (0, mdx_1.createRelativeLink)(source_1.source, page),
        })}/>
        </page_1.DocsBody>
      </page_1.DocsPage>
    </notebook_1.DocsLayout>);
};
const generateStaticParams = async () => source_1.source.generateParams();
exports.generateStaticParams = generateStaticParams;
async function generateMetadata(props) {
    const params = await props.params;
    const page = source_1.source.getPage(params.slug);
    if (!params.slug) {
        return {
            title: "Production-grade Turborepo template for Next.js apps",
            description: "A monorepo template designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, database ORM and more — it's all here.",
        };
    }
    if (!page) {
        (0, navigation_1.notFound)();
    }
    return {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            title: page.data.title,
            description: page.data.description,
            type: "website",
            images: (0, source_1.getPageImage)(page).url,
        },
    };
}
exports.default = Page;
