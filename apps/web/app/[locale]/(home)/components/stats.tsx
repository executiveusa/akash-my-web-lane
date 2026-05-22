const statsItems = [
  { metric: "500+", unit: "", label: "Sites Migrated" },
  { metric: "15x", unit: "", label: "Faster Load Times" },
  { metric: "$0", unit: "/mo", label: "Hosting Cost" },
  { metric: "97", unit: "/100", label: "Lighthouse Score" },
];

export const Stats = () => (
  <div className="w-full bg-[#0a0a0a] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl tracking-tight md:text-5xl">Results That Speak</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[#f2ece0]/60">
          Real numbers from real migrations. No fluff.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsItems.map((item, index) => (
            <div className="rounded-xl border border-[#f2ece0]/10 bg-[#f2ece0]/5 p-6" key={index}>
              <p className="text-4xl font-bold">
                {item.metric}
                <span className="text-lg text-[#f2ece0]/70">{item.unit}</span>
              </p>
              <p className="mt-2 text-sm text-[#f2ece0]/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
