import { z } from "zod";
import { settingSchema } from "../(protected)/settings/_lib/settingFormSchema";

/** ユーザー設定の型(更新用) */
export type UpdateUserSetting = z.infer<typeof settingSchema>;
