import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

const whatsappUrl =
  "https://wa.me/17025273771?text=Hi%20Akash%2C%20I%20want%20to%20review%20a%20website%20with%20MyWebLane";

export const ContactForm = () => {
  return (
    <main className="min-h-[70vh] bg-[#f5f5f1] text-[#171717]">
      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-6 md:px-8 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Human review</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-6xl">
            Bring the evidence. Then decide what the site actually needs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
            If you already ran the MyWebLane check, send the site and the result to Akash. If you have not, run the check first. The conversation starts from measured evidence—not a prewritten redesign pitch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-4 w-4" /> Talk to Akash
            </a>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/15 bg-white px-6 text-sm font-semibold transition hover:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" /> Run the mobile check
            </Link>
          </div>
        </section>

        <aside className="border-y border-black/15 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Bring to the review</p>
          <ol className="mt-4 divide-y divide-black/10 text-sm leading-6 text-black/65">
            <li className="grid grid-cols-[32px_1fr] gap-3 py-4"><span className="font-mono text-xs text-red-600">01</span><span>The website URL.</span></li>
            <li className="grid grid-cols-[32px_1fr] gap-3 py-4"><span className="font-mono text-xs text-red-600">02</span><span>The measured result or the problem you are seeing.</span></li>
            <li className="grid grid-cols-[32px_1fr] gap-3 py-4"><span className="font-mono text-xs text-red-600">03</span><span>What the site needs to accomplish for the business.</span></li>
          </ol>
        </aside>
      </div>
    </main>
  );
};
