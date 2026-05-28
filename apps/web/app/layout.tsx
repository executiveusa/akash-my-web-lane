import type { Metadata } from "next";
import LLMProxyToggle from "../components/LLMProxyToggle";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akash - WordPress to Astro Migration",
  description: "Convert your WordPress site to lightning-fast Astro with AI-powered Synthia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
        <LLMProxyToggle />
      </body>
    </html>
  );
}
