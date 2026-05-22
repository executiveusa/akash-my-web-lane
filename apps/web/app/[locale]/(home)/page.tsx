import { showBetaFeature } from "@repo/feature-flags";
import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import { CTA } from "./components/cta";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { OfferSection } from "./components/offer";
import { PainSection } from "./components/pain";
import { Stats } from "./components/stats";
import { Testimonials } from "./components/testimonials";

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createMetadata(dictionary.web.home.meta);
};

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const betaFeature = await showBetaFeature();

  return (
    <>
      {betaFeature && <div className="w-full bg-black py-2 text-center text-white">Beta feature now available</div>}
      <Hero dictionary={dictionary} locale={locale} />
      <PainSection />
      <Features dictionary={dictionary} />
      <OfferSection />
      <Stats />
      <Testimonials />
      <FAQ dictionary={dictionary} />
      <CTA dictionary={dictionary} />
    </>
  );
};

export default Home;
