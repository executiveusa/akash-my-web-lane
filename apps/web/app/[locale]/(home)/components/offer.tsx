import type { Dictionary } from "@repo/internationalization";

export const OfferSection = ({ dictionary }: { dictionary: Dictionary }) => {
  const d = dictionary.web.home.offer_section;

  return (
    <section className="bg-[#0d0d0d] py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-xs tracking-widest text-[#c9a84c] uppercase">
              The Offer
            </div>
            <h2 className="mb-3 text-3xl font-bold text-[#f2ece0] md:text-4xl">{d?.title}</h2>
            <p className="text-[#f2ece0]/50">{d?.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-8">
            <ul className="space-y-4">
              {(d?.items as string[] ?? []).map((item, i) => (
                <li className="flex items-start gap-3 text-[#f2ece0]/90" key={i}>
                  <span className="shrink-0 text-lg">{item.charAt(0)}</span>
                  <span className="text-base">{item.slice(2)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-[#c9a84c]/10 pt-8 text-center">
              <p className="mb-2 text-sm text-[#f2ece0]/40">
                Competitor charges $5,000 and takes 4 weeks.
              </p>
              <p className="text-xl font-bold text-[#c9a84c]">
                We do it in 25 minutes. Starting at $0 for your first migration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
