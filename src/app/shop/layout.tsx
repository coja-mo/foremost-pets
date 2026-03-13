import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Foremost Pets — Premium Dog, Cat & Fish Supplies',
  description: 'Browse 20+ premium pet food brands including Fromm, GO! Solutions, ACANA, and ORIJEN. Dog food, cat food, treats, toys, supplements & more. Free in-store pickup at both Sault Ste. Marie locations.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
