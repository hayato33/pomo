import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

/**
 * ユーザー情報を取得するカスタムフック
 * @param token - 認証トークン
 * @returns ユーザー情報、ローディング状態、エラー状態、データ再取得関数
 */
export const useUser = ({ token }: { token: string }) => {
  const { data, error, isLoading, mutate } = useSWR("/api/user", (apiPath) =>
    fetcher({ apiPath, token })
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};
