"use client";

import { useRouteGuard } from "./_hooks/useRouteGuard";

/**
 * - 読み込み中はローディングスピナーを表示
 * - 未認証の場合はコンテンツを表示せず、useRouteGuardによってリダイレクト
 * - 認証済みの場合のみコンテンツを表示
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, isAuthenticated } = useRouteGuard();

  if (isLoading) {
    return (
      <div className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="size-8 animate-spin rounded-full border-y-2 border-slate-900" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
