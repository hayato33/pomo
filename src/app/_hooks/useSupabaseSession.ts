import { supabase } from "@/app/_utils/supabase";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Supabaseの認証セッション管理フック
 * @returns {object} 認証状態を含むオブジェクト
 * - session: 認証セッション (undefined: ローディング中, null: 未ログイン, Session: ログイン済み)
 * - isLoading: ローディング状態
 * - token: アクセストークン
 */
export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoading(false);
    };

    fetcher();
    // ページ遷移時にセッション状態を再検証
  }, [pathname]);

  return { session, isLoading, token };
};
