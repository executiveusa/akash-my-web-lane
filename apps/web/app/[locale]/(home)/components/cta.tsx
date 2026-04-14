import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => (
  <div className="w-full bg-[#0d0d0d] py-20 text-[#f2ece0] lg:py-28">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 rounded-md border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-6 text-center lg:p-14">
        <div className="flex flex-col gap-2">
          <h3 className="max-w-2xl text-3xl tracking-tighter md:text-5xl">{dictionary.web.home.cta.title}</h3>
          <p className="max-w-2xl text-lg leading-relaxed text-[#f2ece0]/70">{dictionary.web.home.cta.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="gap-4 border-[#f2ece0]/20 text-[#f2ece0]" variant="outline">
            <Link href="/contact">
              {dictionary.web.global.primaryCta} <PhoneCall className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="gap-4 bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#e2bf6a]">
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              {dictionary.web.home.cta.button} <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
