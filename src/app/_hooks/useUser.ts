import { useGetEndpoint } from "./useGetEndpoint";
import { UserResponse } from "@/app/_types/user";

/**
 * ユーザー情報を取得するカスタムフック
 * @returns ユーザー情報、ローディング状態、エラー状態、データ再取得関数
 */
export const useUser = () => {
  return useGetEndpoint<UserResponse>("/api/user");
};
