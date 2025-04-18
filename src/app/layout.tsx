import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import ClientLayout from "./_components/layout/ClientLayout";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Pomo! - カスタマイズ性抜群のポモドーロ記録アプリ",
  description:
    "カスタマイズ性抜群のポモドーロ記録アプリです。ほぼ全ての機能をオン/オフ切り替え可能です。",
  openGraph: {
    title: "Pomo! - カスタマイズ性抜群のポモドーロ記録アプリ",
    description:
      "カスタマイズ性抜群のポモドーロ記録アプリです。ほぼ全ての機能をオン/オフ切り替え可能です。",
    images: [
      {
        url: "/ogp/thumbnail.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="antialiased">
      <body className="pb-16 sm:pb-0">
        <ClientLayout>{children}</ClientLayout>
      </body>
      <GoogleTagManager gtmId="GTM-PMLJ2R6P" />
    </html>
  );
}
