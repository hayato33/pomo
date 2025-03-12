import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { useSupabaseSession } from "./useSupabaseSession";

/**
 * APIエンドポイントからGETメソッドでデータを取得する汎用的なカスタムフック
 * @param endpoint - APIエンドポイントパス（例: "/api/user"）
 * @returns リソースデータ、ローディング状態、エラー状態、データ再取得関数
 */
export const useGetEndpoint = (endpoint: string) => {
  const { token } = useSupabaseSession();

  const { data, error, isLoading, mutate } = useSWR(
    token ? endpoint : null,
    token ? (apiPath) => fetcher({ apiPath, token }) : null
  );

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  };
};
