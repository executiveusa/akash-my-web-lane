"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
const accordion_1 = require("@repo/design-system/components/ui/accordion");
const button_1 = require("@repo/design-system/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const FAQ = ({ dictionary }) => (<div className="w-full bg-[#0a0a0a] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h4 className="text-3xl tracking-tight md:text-5xl">{dictionary.web.home.faq.title}</h4>
          <p className="max-w-xl text-lg text-[#f2ece0]/60">{dictionary.web.home.faq.description}</p>
          <button_1.Button asChild className="w-fit gap-4 border-[#f2ece0]/20 text-[#f2ece0]" variant="outline">
            <link_1.default href="/contact">
              {dictionary.web.home.faq.cta} <lucide_react_1.PhoneCall className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
        </div>
        <accordion_1.Accordion className="w-full" collapsible type="single">
          {dictionary.web.home.faq.items.map((item, index) => (<accordion_1.AccordionItem key={index} value={`index-${index}`}>
              <accordion_1.AccordionTrigger>{item.question}</accordion_1.AccordionTrigger>
              <accordion_1.AccordionContent>{item.answer}</accordion_1.AccordionContent>
            </accordion_1.AccordionItem>))}
        </accordion_1.Accordion>
      </div>
    </div>
  </div>);
exports.FAQ = FAQ;
