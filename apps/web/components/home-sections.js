"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = Hero;
exports.Features = Features;
exports.Stats = Stats;
exports.Testimonials = Testimonials;
exports.FAQ = FAQ;
exports.CTA = CTA;
const button_1 = require("@repo/design-system/button");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
function Hero({ t }) {
    const heroText = t?.web?.home?.hero || {};
    const globalCta = t?.web?.global || {};
    return (<section className="w-full bg-gradient-to-b from-background to-background/80 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold">
            <lucide_react_1.Zap className="h-4 w-4"/>
            <span>{heroText.announcement || "🚀 Free migration for first 100 Indian developers"}</span>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            <span>WordPress छोड़ो।</span>
            <br />
            <span className="bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">AI-Ready बनो।</span>
            <br />
            <span>25 मिनट में।</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Akash Engine आपके Client की WordPress site को lightning-fast, AI-ready website में बदल देता है। Lighthouse 90+ guaranteed। ₹0/month hosting हमेशा के लिए।
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-red/20 bg-red/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <lucide_react_1.Shield className="h-5 w-5 text-red"/>
              <span className="text-sm font-medium text-red">WordPress</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-foreground">6.2s</div>
              <p className="text-sm text-muted-foreground">Average load time</p>
            </div>
            <div className="text-xs text-muted-foreground">❌ 34/100 Lighthouse score</div>
          </div>

          <div className="rounded-lg border border-gold/20 bg-gold/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <lucide_react_1.Cloud className="h-5 w-5 text-gold"/>
              <span className="text-sm font-medium text-gold">Akash Engine</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-gold">0.4s</div>
              <p className="text-sm text-muted-foreground">Average load time</p>
            </div>
            <div className="text-xs text-gold">✅ 94/100 Lighthouse score</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center sm:flex-row sm:gap-6">
          <button_1.Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold">
            {globalCta.primaryCta || "मुफ्त में माइग्रेशन शुरू करें"}
            <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
          </button_1.Button>
          <button_1.Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10">
            {globalCta.secondaryCta || "3 मिनट का demo देखें"}
          </button_1.Button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ✅ 1,000+ Indian developers already using Akash Engine
          </p>
        </div>
      </div>
    </section>);
}
function Features({ t }) {
    const features = t?.web?.home?.features || {};
    const items = features.items || [];
    return (<section className="w-full px-4 py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{features.title || "Features"}</h2>
          <p className="text-lg text-muted-foreground">{features.description || ""}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, idx) => (<div key={idx} className="rounded-lg border border-border bg-background p-6 hover:border-gold/50 transition-colors">
              <div className="flex items-start gap-4">
                <lucide_react_1.CheckCircle className="h-6 w-6 text-gold flex-shrink-0 mt-1"/>
                <div>
                  <h3 className="mb-2 font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
function Stats({ t }) {
    const stats = t?.web?.home?.stats || {};
    const items = stats.items || [];
    return (<section className="w-full px-4 py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{stats.title || "Stats"}</h2>
          <p className="text-lg text-muted-foreground">{stats.description || ""}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {items.map((item, idx) => (<div key={idx} className="rounded-lg border border-gold/20 bg-gold/5 p-6 text-center">
              <lucide_react_1.TrendingUp className="h-5 w-5 text-gold mx-auto mb-3"/>
              <div className="mb-2 text-3xl md:text-4xl font-bold text-foreground">{item.metric}</div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
function Testimonials({ t }) {
    const testimonials = t?.web?.home?.testimonials || {};
    const items = testimonials.items || [];
    return (<section className="w-full px-4 py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{testimonials.title || "Testimonials"}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, idx) => (<div key={idx} className="rounded-lg border border-border bg-background p-6">
              <lucide_react_1.Quote className="h-5 w-5 text-gold mb-4"/>
              <p className="mb-4 text-foreground italic">&quot;{item.description}&quot;</p>
              <div className="flex items-center gap-3">
                {item.author?.image && (<image_1.default src={item.author.image} alt={item.author.name} width={40} height={40} className="rounded-full"/>)}
                <div>
                  <p className="font-semibold text-sm">{item.author?.name || "Anonymous"}</p>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
function FAQ({ t }) {
    const faq = t?.web?.home?.faq || {};
    const items = faq.items || [];
    const [openIdx, setOpenIdx] = (0, react_1.useState)(0);
    return (<section className="w-full px-4 py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{faq.title || "FAQ"}</h2>
          <p className="text-lg text-muted-foreground">{faq.description || ""}</p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (<div key={idx} className="rounded-lg border border-border overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="flex w-full items-center justify-between gap-4 bg-muted/50 p-4 hover:bg-muted transition-colors text-left">
                <span className="font-semibold text-sm md:text-base">{item.question}</span>
                <lucide_react_1.ChevronDown className={`h-5 w-5 text-gold transition-transform flex-shrink-0 ${openIdx === idx ? "rotate-180" : ""}`}/>
              </button>
              {openIdx === idx && (<div className="px-4 py-4 text-sm md:text-base text-muted-foreground bg-background">
                  {item.answer}
                </div>)}
            </div>))}
        </div>
      </div>
    </section>);
}
function CTA({ t }) {
    const cta = t?.web?.home?.cta || {};
    const globalCta = t?.web?.global || {};
    return (<section className="w-full px-4 py-16 md:py-24 bg-gradient-to-r from-gold/10 to-gold/5 border-t border-gold/20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold">{cta.title || "Ready to get started?"}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{cta.description || ""}</p>
        <button_1.Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold">
          {cta.button || globalCta.primaryCta || "शुरू करें"}
          <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
        </button_1.Button>
      </div>
    </section>);
}
