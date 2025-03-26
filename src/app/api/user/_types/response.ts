import { UpdateUser } from "@/app/_types/user";

/** ユーザー情報更新データのレスポンス型定義 */
export interface UpdateUserResponseType {
  status: string;
  message: string;
  data: UpdateUser;
}
