import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/design-system/components/ui/accordion";
import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

type FAQProps = {
  dictionary: Dictionary;
};

export const FAQ = ({ dictionary }: FAQProps) => (
  <div className="w-full bg-[#0a0a0a] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h4 className="text-3xl tracking-tight md:text-5xl">{dictionary.web.home.faq.title}</h4>
          <p className="max-w-xl text-lg text-[#f2ece0]/60">{dictionary.web.home.faq.description}</p>
          <Button asChild className="w-fit gap-4 border-[#f2ece0]/20 text-[#f2ece0]" variant="outline">
            <Link href="/contact">
              {dictionary.web.home.faq.cta} <PhoneCall className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Accordion className="w-full" collapsible type="single">
          {dictionary.web.home.faq.items.map((item, index) => (
            <AccordionItem key={index} value={`index-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);
