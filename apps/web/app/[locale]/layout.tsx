import "./styles.css";
import type { ReactNode } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({ children, params }: RootLayoutProperties) {
  const { locale } = await params;

  return (
    <html className="scroll-smooth motion-reduce:scroll-auto" lang={locale}>
      <body className="min-h-screen bg-[#f3f1ea] text-[#181817] antialiased">
        <a
          href="#page-content"
          className="fixed left-4 top-4 z-[1000] -translate-y-24 bg-white px-4 py-3 text-sm font-semibold text-black shadow-lg transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-black motion-reduce:transition-none"
        >
          Skip to content
        </a>
        <Header />
        <div id="page-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
