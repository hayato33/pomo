import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useRouteGuard = () => {
  const router = useRouter();
  const { session, isLoading } = useSupabaseSession();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (isLoading) return; // ロード中の場合は何もしない

    const fetcher = async () => {
      if (session === null) {
        router.replace('/login');
      } else {
        setIsAllowed(true); // ログインしている場合は表示を許可
      }
    };

    fetcher();
  }, [router, session, isLoading]);

  return isAllowed;
};
