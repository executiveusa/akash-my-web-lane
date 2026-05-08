import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akash Engine - WordPress to Astro Migration",
  description: "Transform WordPress sites into lightning-fast Astro with AI-powered Synthia. 25 minutes, Lighthouse 90+ guaranteed.",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <>{children}</>;
}
