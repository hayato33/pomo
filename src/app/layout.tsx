import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/app/_components/layout/Header";
import { MobileNav } from "@/app/_components/layout/Nav";
import Footer from "@/app/_components/layout/Footer";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} pb-16 antialiased sm:pb-0`}
      >
        <Theme className="min-h-fit">
          <Header />
          <MobileNav />
          <main className="min-h-[calc(100vh-7.5rem)] p-4 sm:min-h-[calc(100vh-5.75rem)] sm:py-12">
            {children}
          </main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
