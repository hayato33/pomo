import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

/**
 * ユーザー設定を取得するカスタムフック
 * @param token - 認証トークン
 * @returns ユーザー情報、ローディング状態、エラー状態、データ再取得関数
 */
export const useSetting = ({ token }: { token: string }) => {
  const { data, error, isLoading, mutate } = useSWR("/api/setting", (apiPath) =>
    fetcher({ apiPath, token })
  );

  return {
    setting: data,
    isLoading,
    isError: error,
    mutate,
  };
};
