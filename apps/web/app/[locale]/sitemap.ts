import fs from "node:fs";
import type { MetadataRoute } from "next";
import { env } from "@/env";

const appFolders = fs.readdirSync("app", { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith("_"))
  .filter((folder) => !folder.name.startsWith("("))
  .map((folder) => folder.name);

const protocol = env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith("https")
  ? "https"
  : "http";
const url = new URL(`${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`);

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const entries: MetadataRoute.Sitemap = [
    {
      url: new URL("/", url).href,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: new URL(page, url).href,
      lastModified: new Date(),
    })),
  ];

  // Try to fetch blog and legal posts, but don't fail if CMS is unavailable
  try {
    const { blog, legal } = await import("@repo/cms");
    const blogs = (await blog.getPosts()).map((post) => post._slug);
    const legals = (await legal.getPosts()).map((post) => post._slug);

    entries.push(
      ...blogs.map((blog) => ({
        url: new URL(`blog/${blog}`, url).href,
        lastModified: new Date(),
      }))
    );

    entries.push(
      ...legals.map((legal) => ({
        url: new URL(`legal/${legal}`, url).href,
        lastModified: new Date(),
      }))
    );
  } catch (error) {
    console.error("[v0] Failed to fetch CMS posts for sitemap:", error);
    // Continue without CMS posts
  }

  return entries;
};

export default sitemap;
