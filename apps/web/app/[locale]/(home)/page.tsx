import { showBetaFeature } from "@repo/feature-flags";
import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import { MyWebLaneLanding } from "./components/my-web-lane";

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createMetadata({
    title: "My Web Lane — Stop Losing to Slower Competitors",
    description: "We migrate slow WordPress sites to blazing-fast Astro + Cloudflare Pages — in 25 minutes.",
  });
};

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const betaFeature = await showBetaFeature();

  return (
    <>
      <MyWebLaneLanding />
    </>
  );
};

export default Home;
