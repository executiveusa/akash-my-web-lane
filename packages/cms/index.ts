// Lazy load basehub only when needed
let basehub: any = null;
let fragmentOn: any = null;

try {
  const { basehub: basehubClient, fragmentOn: basehubFragmentOn } = await import("basehub");
  await import("./basehub.config");
  basehub = basehubClient({
    token: process.env.BASEHUB_TOKEN,
  });
  fragmentOn = basehubFragmentOn;
} catch (error) {
  // If basehub initialization fails, continue with dummy implementations
  fragmentOn = () => ({});
}

// ensures types are passed through to apps that use this package
import type * as _types from "./basehub-types.d.ts";

/* -------------------------------------------------------------------------------------------------
 * Common Fragments
 * -----------------------------------------------------------------------------------------------*/

const imageFragment = fragmentOn("BlockImage", {
  url: true,
  width: true,
  height: true,
  alt: true,
  blurDataURL: true,
});

/* -------------------------------------------------------------------------------------------------
 * Blog Fragments & Queries
 * -----------------------------------------------------------------------------------------------*/

const postMetaFragment = fragmentOn("BlockList", {
  _slug: true,
  _title: true,
});

const postFragment = fragmentOn("BlockList", {
  ...postMetaFragment,
});

export type PostMeta = any;
export type Post = any;

export const blog = {
  // Dummy implementation returning empty data
  getPosts: async (): Promise<PostMeta[]> => {
    return [];
  },
  getLatestPost: async (): Promise<Post | null> => {
    return null;
  },
  getPost: async (slug: string): Promise<Post | null> => {
    return null;
  },
};

/* -------------------------------------------------------------------------------------------------
 * Legal Fragments & Queries
 * -----------------------------------------------------------------------------------------------*/

// Dummy legal implementation with no real queries
export const legal = {
  // Returns an empty list of legal post meta
  getPosts: async (): Promise<LegalPostMeta[]> => {
    return [];
  },
  // Returns null for latest legal post
  getLatestPost: async (): Promise<LegalPost | null> => {
    return null;
  },
  // Returns null for a specific legal post
  getPost: async (slug: string): Promise<LegalPost | null> => {
    return null;
  },
};

type LegalPostMeta = any;
type LegalPost = any;

export * from "./emdash-deployer";
