"use client";

import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/app/_components/layout/Header";
import { MobileNav } from "@/app/_components/layout/Nav";
import Footer from "@/app/_components/layout/Footer";
import { useFont } from "@/app/_hooks/useFont";

/** クライアントサイドのレイアウトコンポーネント */
export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fontVariable, fontClass } = useFont();

  return (
    <>
      <Theme className={`${fontVariable} ${fontClass} min-h-fit`}>
        <ToastContainer autoClose={3000} hideProgressBar theme="colored" />
        <Header />
        <MobileNav />
        <main className="relative min-h-[calc(100vh-7.5rem)] p-4 sm:min-h-[calc(100vh-5.75rem)] sm:py-12">
          {children}
        </main>
        <Footer />
      </Theme>
    </>
  );
}
