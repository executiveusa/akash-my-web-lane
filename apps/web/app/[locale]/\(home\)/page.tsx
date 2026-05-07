import { getDictionary } from "@repo/internationalization";
import { Hero } from "./components/hero";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.web.home.meta.title,
    description: dictionary.web.home.meta.description,
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <main>
      <Hero dictionary={dictionary} locale={locale} />
    </main>
  );
}
