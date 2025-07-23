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
 * - error: エラー情報
 */
export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetcher = async () => {
      try {
        setError(null); // エラー状態をリセット
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("セッション取得エラー:", sessionError);
          setError(sessionError);
          setSession(null);
          setToken(null);
        } else {
          setSession(session);
          setToken(session?.access_token || null);
        }
      } catch (error) {
        console.error("予期しないセッション取得エラー:", error);
        const errorInstance =
          error instanceof Error
            ? error
            : new Error("セッション取得に失敗しました");
        setError(errorInstance);
        setSession(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
    // ページ遷移時にセッション状態を再検証
  }, [pathname]);

  // セッション自動更新の監視
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setToken(session?.access_token || null);
      setError(null); // セッション更新時にエラーをクリア
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, isLoading, token, error };
};
