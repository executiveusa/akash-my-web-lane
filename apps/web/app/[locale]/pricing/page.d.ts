import type { Metadata } from "next";
type PricingProps = {
    params: Promise<{
        locale: string;
    }>;
};
export declare const generateMetadata: ({ params, }: PricingProps) => Promise<Metadata>;
declare const Pricing: ({ params }: PricingProps) => Promise<import("react").JSX.Element>;
export default Pricing;
//# sourceMappingURL=page.d.ts.map