import { getDictionary } from "@repo/internationalization";
import { Hero, Features, Stats, Testimonials, FAQ, CTA } from "@/components/home-sections";

export const metadata = {
  title: "WordPress छोड़ो। AI-Ready बनो। 25 मिनट में।",
  description: "Akash Engine आपके Client की WordPress site को 25 मिनट में AI-ready, lightning-fast website में बदल देता है। Lighthouse 90+ guaranteed।",
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <main className="w-full">
      <Hero t={t} />
      <Features t={t} />
      <Stats t={t} />
      <Testimonials t={t} />
      <FAQ t={t} />
      <CTA t={t} />
    </main>
  );
}
