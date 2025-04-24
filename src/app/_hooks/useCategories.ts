import { useGetEndpoint } from "./useGetEndpoint";

/**
 * カテゴリ情報を取得するカスタムフック
 * @returns カテゴリ情報、ローディング状態、エラー状態、データ再取得関数
 */
export const useCategories = () => {
  return useGetEndpoint("/api/category");
};
