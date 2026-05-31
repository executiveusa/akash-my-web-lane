"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cases = void 0;
const carousel_1 = require("@repo/design-system/components/ui/carousel");
const react_1 = require("react");
const migrationWins = [
    { niche: "Dental Clinic", location: "Pune, IN", before: 31, after: 97, loadBefore: "6.8s", loadAfter: "0.3s", result: "+44% bookings" },
    { niche: "Law Firm", location: "Austin, TX", before: 38, after: 95, loadBefore: "5.9s", loadAfter: "0.4s", result: "+3 clients wk 1" },
    { niche: "Restaurant", location: "CDMX, MX", before: 29, after: 98, loadBefore: "7.2s", loadAfter: "0.4s", result: "3× reservations" },
    { niche: "Contractor", location: "Denver, CO", before: 41, after: 96, loadBefore: "5.1s", loadAfter: "0.5s", result: "Page 1 Google" },
    { niche: "E-Commerce", location: "Mumbai, IN", before: 24, after: 94, loadBefore: "8.4s", loadAfter: "0.4s", result: "+60% conversions" },
    { niche: "Consultant", location: "New York", before: 36, after: 97, loadBefore: "6.1s", loadAfter: "0.4s", result: "±0 SEO loss" },
    { niche: "Clinic", location: "Guadalajara, MX", before: 33, after: 96, loadBefore: "6.5s", loadAfter: "0.3s", result: "+28% leads" },
    { niche: "Agency", location: "Chicago, IL", before: 45, after: 95, loadBefore: "4.8s", loadAfter: "0.5s", result: "6 clients closed" },
];
const Cases = ({ dictionary }) => {
    const [api, setApi] = (0, react_1.useState)();
    const timerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!api)
            return;
        const advance = () => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                api.scrollTo(0);
            }
            else {
                api.scrollNext();
            }
            timerRef.current = setTimeout(advance, 2800);
        };
        timerRef.current = setTimeout(advance, 2800);
        return () => {
            if (timerRef.current)
                clearTimeout(timerRef.current);
        };
    }, [api]);
    return (<div className="w-full bg-[#0a0a0a] py-20 text-[#f2ece0] lg:py-28">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div className="mb-2 inline-block rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-xs tracking-widest text-[#c9a84c] uppercase w-fit">
              Live Results
            </div>
            <h2 className="text-left text-3xl font-bold tracking-tight md:text-5xl lg:max-w-xl">
              {dictionary.web.home.cases.title}
            </h2>
          </div>
          <carousel_1.Carousel className="w-full" setApi={setApi} opts={{ align: "start", loop: true }}>
            <carousel_1.CarouselContent className="-ml-4">
              {migrationWins.map((win, index) => (<carousel_1.CarouselItem className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
                  <div className="rounded-2xl border border-[#f2ece0]/8 bg-[#f2ece0]/3 p-5 h-full">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#c9a84c]/70 uppercase tracking-wider">{win.niche}</span>
                      <span className="text-xs text-[#f2ece0]/30">{win.location}</span>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-[#e85555]/10 border border-[#e85555]/20 p-3 text-center">
                        <div className="font-mono text-xl font-bold text-[#e85555]">{win.before}</div>
                        <div className="text-[10px] text-[#f2ece0]/40 mt-0.5">Before</div>
                        <div className="text-[10px] text-[#f2ece0]/30">{win.loadBefore}</div>
                      </div>
                      <div className="rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 p-3 text-center">
                        <div className="font-mono text-xl font-bold text-[#4ade80]">{win.after}</div>
                        <div className="text-[10px] text-[#f2ece0]/40 mt-0.5">After</div>
                        <div className="text-[10px] text-[#f2ece0]/30">{win.loadAfter}</div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 px-3 py-2 text-center">
                      <span className="text-sm font-semibold text-[#c9a84c]">{win.result}</span>
                    </div>
                  </div>
                </carousel_1.CarouselItem>))}
            </carousel_1.CarouselContent>
          </carousel_1.Carousel>
        </div>
      </div>
    </div>);
};
exports.Cases = Cases;
