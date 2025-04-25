import { useGetEndpoint } from "./useGetEndpoint";
import { SettingResponse } from "@/app/_types/setting";

/**
 * ユーザー設定を取得するカスタムフック
 * @returns ユーザー設定、ローディング状態、エラー状態、データ再取得関数
 */
export const useSetting = () => {
  return useGetEndpoint<SettingResponse>("/api/setting");
};
