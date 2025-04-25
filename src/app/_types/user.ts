import { z } from "zod";
import { userSchema } from "../(protected)/settings/_lib/settingFormSchema";
import { User } from "@prisma/client";

/** ユーザー情報の型(更新用) */
export type UpdateUser = z.infer<typeof userSchema>;

/** ユーザー情報取得・更新APIのレスポンス型定義 */
export interface UserResponse {
  status: "success";
  message: string;
  data: User;
}
