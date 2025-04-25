import { useGetEndpoint } from "./useGetEndpoint";
import { GetRankingResponse } from "@/app/_types/ranking";

/**
 * ランキング情報を取得するカスタムフック
 * @returns ランキング情報、ローディング状態、エラー状態、データ再取得関数
 */
export const useRanking = () => {
  return useGetEndpoint<GetRankingResponse>("/api/ranking");
};
