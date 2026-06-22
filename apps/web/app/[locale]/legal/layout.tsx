import type { ReactNode } from "react";

type LegalLayoutProps = {
  children: ReactNode;
};

const LegalLayout = ({ children }: LegalLayoutProps) => (
  <>
    {children}
    {/* CMS Toolbar disabled until BASEHUB_TOKEN is configured */}
  </>
);

export default LegalLayout;
