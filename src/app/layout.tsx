import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import ClientLayout from "./_components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
    </html>
  );
}
