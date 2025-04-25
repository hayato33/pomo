import { z } from "zod";
import { settingSchema } from "../(protected)/settings/_lib/settingFormSchema";
import { UserSetting } from "@prisma/client";

/** ユーザー設定の型(更新用) */
export type UpdateUserSetting = z.infer<typeof settingSchema>;

/** ユーザー設定取得・更新APIのレスポンス型定義 */
export interface SettingResponse {
  status: "success";
  message: string;
  data: UserSetting;
}
