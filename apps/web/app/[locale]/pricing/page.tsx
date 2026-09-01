import { redirect } from "next/navigation";

type PricingProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PricingPage({ params }: PricingProps) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
