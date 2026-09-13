import type { Metadata } from "next";
import { MyWebLaneV2 } from "./components/my-web-lane-v2";

export const metadata: Metadata = {
  title: "MyWebLane — Diagnose Before You Rebuild | Akash Engine",
  description:
    "A mobile-first website diagnostic from Akash Engine. Measure real Lighthouse evidence before deciding to keep, clean up, or migrate a site.",
  openGraph: {
    title: "MyWebLane — Diagnose Before You Rebuild | Akash Engine",
    description:
      "Measure the current site first. Keep what works and change only what the evidence can justify.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyWebLane — Diagnose Before You Rebuild | Akash Engine",
    description:
      "Measure the current site first. Keep what works and change only what the evidence can justify.",
  },
};

export default function Home() {
  return <MyWebLaneV2 />;
}
