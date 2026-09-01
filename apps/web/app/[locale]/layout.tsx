import "./styles.css";
import { AnalyticsProvider } from "@repo/analytics/provider";
import { Toolbar as CMSToolbar } from "@repo/cms/components/toolbar";
import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import { cn } from "@repo/design-system/lib/utils";
import { Toolbar } from "@repo/feature-flags/components/toolbar";
import { getDictionary } from "@repo/internationalization";
import type { ReactNode } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html
      className={cn(fonts, "scroll-smooth motion-reduce:scroll-auto")}
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <AnalyticsProvider>
          <DesignSystemProvider>
            <a
              href="#page-content"
              className="fixed left-4 top-4 z-[1000] -translate-y-24 bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-foreground motion-reduce:transition-none"
            >
              Skip to content
            </a>
            <Header dictionary={dictionary} />
            <div id="page-content" tabIndex={-1}>
              {children}
            </div>
            <Footer />
          </DesignSystemProvider>
          <Toolbar />
          <CMSToolbar />
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
