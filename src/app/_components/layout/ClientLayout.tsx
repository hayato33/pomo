"use client";

import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/app/_components/layout/Header";
import { MobileNav } from "@/app/_components/layout/Nav";
import Footer from "@/app/_components/layout/Footer";
import { useFont } from "@/app/_hooks/useFont";
import { usePWADetection } from "@/app/_hooks/usePWADetection";
import PullToRefresh from "react-simple-pull-to-refresh";

/** アプリのコンテンツを表示するシェルコンポーネント */
const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { fontVariable, fontClass } = useFont();

  return (
    <Theme className={`${fontVariable} ${fontClass} min-h-fit`}>
      <ToastContainer autoClose={3000} hideProgressBar theme="colored" />
      <Header />
      <MobileNav />
      <main className="relative min-h-[calc(100vh-7.5rem)] p-4 sm:min-h-[calc(100vh-5.75rem)] sm:py-12">
        {children}
      </main>
      <Footer />
    </Theme>
  );
};

/**
 * クライアントサイドのレイアウトコンポーネント
 * PWAモードの場合は画面を下スワイプで更新
 */
export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPWA = usePWADetection();

  // PWAモードでない場合は通常のコンテンツを表示
  if (!isPWA) return <AppShell>{children}</AppShell>;

  // PWAモードの場合は画面を下スワイプで更新
  const handleRefresh = async () => window.location.reload();

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <AppShell>{children}</AppShell>
    </PullToRefresh>
  );
}
