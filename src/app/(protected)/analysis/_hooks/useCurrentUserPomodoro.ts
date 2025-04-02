import useSWR from "swr";
import { fetcher } from "@/app/_utils/fetcher";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

/**
 * ログインユーザーの全ポモドーロログを取得するカスタムフック
 * @returns ポモドーロログ、ローディング状態、エラー状態、データ再取得関数
 */
export const useCurrentUserPomodoro = () => {
  const { token } = useSupabaseSession();
  const { data, error, isLoading, mutate } = useSWR(
    token ? "/api/pomodoro" : null,
    token ? (apiPath) => fetcher({ apiPath, token }) : null
  );

  return {
    data: data?.data,
    isLoading,
    isError: !!error,
    mutate,
  };
};
