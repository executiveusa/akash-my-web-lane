import Link from "next/link";

type OpenSourcePageProps = {
  params: Promise<{ locale: string }>;
};

const OpenSourcePage = async ({ params }: OpenSourcePageProps) => {
  const { locale } = await params;
  const isHindi = locale === "hi";

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 text-[#f2ece0]">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold md:text-6xl">Akash Engine OSS — Free your clients from WordPress</h1>
        <p className="mt-6 text-lg text-[#f2ece0]/70">
          {isHindi
            ? "यह ओपन-सोर्स वर्ज़न WordPress से Astro migration को आसान बनाता है।"
            : "The open-source core migrates WordPress to Astro with a clean, extensible pipeline."}
        </p>

        <div className="mt-8">
          <Link className="text-[#c9a84c] underline" href="https://github.com/executiveusa/akash-engine-oss">
            github.com/executiveusa/akash-engine-oss
          </Link>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#4ade80]/30 bg-[#4ade80]/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Included in OSS</h2>
            <ul className="space-y-2 text-[#f2ece0]/80">
              <li>• WordPress REST API extractor</li>
              <li>• HTML to MDX transformer</li>
              <li>• Astro + emdash scaffold</li>
              <li>• Cloudflare Pages deployer</li>
              <li>• WhatsApp notifier + job queue</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#e85555]/30 bg-[#e85555]/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Paid SYNTHIA Layer</h2>
            <ul className="space-y-2 text-[#f2ece0]/80">
              <li>• UDEC quality loop</li>
              <li>• SYNTHIA generator intelligence</li>
              <li>• Advanced routing + QA workflows</li>
              <li>• Agency dashboard & lead automation</li>
              <li>• Managed support for delivery teams</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-[#f2ece0]/10 bg-[#f2ece0]/5 p-6">
          <h3 className="text-xl font-semibold">Quick start</h3>
          <pre className="mt-3 overflow-x-auto rounded bg-black/30 p-4 text-sm">
{`git clone https://github.com/executiveusa/akash-engine-oss
cd akash-engine-oss
pnpm install
pnpm dev`}
          </pre>
          <p className="mt-3 text-sm text-[#f2ece0]/60">
            OSS uses a generic OpenAI-compatible model interface. No private SYNTHIA implementation is bundled.
          </p>
        </section>
      </div>
    </main>
  );
};

export default OpenSourcePage;
