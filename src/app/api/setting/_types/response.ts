import { UpdateUserSetting } from "@/app/_types/setting";

/** ユーザー設定更新データのレスポンス型定義 */
export interface UpdateSettingResponseType {
  status: string;
  message: string;
  data: UpdateUserSetting;
}
