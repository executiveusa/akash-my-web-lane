import { showBetaFeature } from "@repo/feature-flags";
import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import { MyWebLaneV2 } from "./components/my-web-lane-v2";

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  await getDictionary(locale);

  return createMetadata({
    title: "MyWebLane — Audit WordPress. Keep It or Move With Evidence.",
    description:
      "An evidence-first website audit from Akash Engine. Measure the current site, identify real drag, and decide whether to keep WordPress, clean it up, or prepare a modern migration.",
  });
};

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  await getDictionary(locale);
  await showBetaFeature();

  return <MyWebLaneV2 />;
};

export default Home;
