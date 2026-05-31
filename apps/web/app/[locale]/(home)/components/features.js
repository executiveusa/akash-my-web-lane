"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Features = void 0;
const lucide_react_1 = require("lucide-react");
const icons = [lucide_react_1.Zap, lucide_react_1.Cpu, lucide_react_1.Globe, lucide_react_1.LayoutDashboard];
const Features = ({ dictionary }) => (<section className="w-full bg-[#0a0a0a] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="max-w-xl text-left text-3xl font-bold tracking-tight md:text-5xl">
            {dictionary.web.home.features.title}
          </h2>
          <p className="max-w-xl text-left text-lg leading-relaxed text-[#f2ece0]/60 lg:max-w-lg">
            {dictionary.web.home.features.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.web.home.features.items.map((item, index) => {
        const Icon = icons[index % icons.length];
        const isWide = index === 0 || index === 3;
        return (<div key={index} className={`flex flex-col justify-between rounded-2xl border border-[#f2ece0]/8 bg-[#f2ece0]/3 p-6 ${isWide ? "lg:col-span-2" : ""}`}>
                <Icon className="mb-6 h-7 w-7 text-[#c9a84c]" strokeWidth={1.5}/>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg text-[#f2ece0] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-[#f2ece0]/60">
                    {item.description}
                  </p>
                </div>
              </div>);
    })}
        </div>
      </div>
    </div>
  </section>);
exports.Features = Features;
