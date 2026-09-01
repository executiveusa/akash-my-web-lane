import { legal } from "@repo/cms";
import { Status } from "@repo/observability/status";
import Link from "next/link";

export const Footer = async () => {
  const legalPosts = (await legal.getPosts()) as any[];

  return (
    <footer className="border-t border-black/10 bg-[#111] text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xl font-semibold tracking-[-0.025em]">MyWebLane</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
              Measure first. Preserve what works. Change only what the evidence can justify.
            </p>
            <div className="mt-5"><Status /></div>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/60" aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/contact">Talk to Akash</Link>
            {legalPosts.map((post) => (
              <Link key={post._slug} href={`/legal/${post._slug}`}>
                {post._title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
