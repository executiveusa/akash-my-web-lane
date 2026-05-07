import type { Dictionary } from "@repo/internationalization";

type PainItem = { icon: string; title: string; description: string };

export const PainSection = ({ dictionary }: { dictionary: Dictionary }) => {
  const items: PainItem[] = (dictionary.web.home.pain_section?.items ?? []) as PainItem[];

  return (
    <section className="border-y border-[#f2ece0]/5 bg-[#0a0a0a] py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#f2ece0] md:text-4xl">
          {dictionary.web.home.pain_section?.title}
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-[#f2ece0]/50">
          If any of these sound familiar, you're in the right place.
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <div
              className="group rounded-2xl border border-[#e85555]/20 bg-[#e85555]/5 p-6 transition-all hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5"
              key={i}
            >
              <div className="mb-3 text-2xl">{item.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-[#f2ece0]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#f2ece0]/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
