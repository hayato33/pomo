'use client';

import { useRouteGuard } from '@/app/_hooks/useRouteGuard';

export default function Page() {
  const isAllowed = useRouteGuard();

  return !isAllowed ? <>読み込み中...</> : <>設定ページ</>;
}
