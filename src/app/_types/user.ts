import { z } from "zod";
import { userSchema } from "../settings/_lib/settingFormSchema";

/** ユーザー情報の型(更新用) */
export type UpdateUser = z.infer<typeof userSchema>;
