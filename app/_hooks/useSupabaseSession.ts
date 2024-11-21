import { supabase } from '@/app/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

export const useSupabaseSession = () => {
  // undefined: ログイン状態ロード中, null: ログインしていない, Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    setToken(session?.access_token || null);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSession();

    // 認証状態の変化を監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setToken(session?.access_token || null);
    });

    // クリーンアップ
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading, token };
};
