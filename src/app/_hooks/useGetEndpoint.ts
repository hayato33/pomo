import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { useSupabaseSession } from "./useSupabaseSession";

/**
 * APIエンドポイントからGETメソッドでデータを取得する汎用的なカスタムフック
 * @param endpoint - APIエンドポイントパス（例: "/api/user"）
 * @returns リソースデータ、ローディング状態、エラー状態、データ再取得関数
 */
export const useGetEndpoint = <T>(endpoint: string) => {
  const { token } = useSupabaseSession();

  const { data, error, isLoading, mutate } = useSWR<T>(
    token ? endpoint : null,
    token ? (apiPath: string) => fetcher({ apiPath, token }) : null
  );

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  };
};
