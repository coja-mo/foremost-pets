import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Foremost Pets | Dedicated to Pet Nutrition — Sault Ste. Marie",
  description:
    "Foremost Pets is Sault Ste. Marie's premier local pet nutrition store. Premium dog, cat & fish supplies. Shop Fromm, GO!, ACANA, ORIJEN & more. Two convenient locations.",
  keywords: [
    "pet store",
    "Sault Ste. Marie",
    "dog food",
    "cat food",
    "pet nutrition",
    "Foremost Pets",
    "Fromm",
    "GO Solutions",
    "ACANA",
    "ORIJEN",
    "pet supplies",
    "Ontario pet store",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#f59e0b',
                secondary: '#1e293b',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
