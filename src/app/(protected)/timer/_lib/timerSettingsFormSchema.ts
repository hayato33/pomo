import { z } from "zod";

/**
 * ポモドーロタイマー各種数値変更フォームのバリデーションスキーマ
 * - 集中時間:
 *   - 必須
 *   - 1分以上90分以下
 * - 短い休憩時間:
 *   - 必須
 *   - 1分以上30分以下
 * - 長い休憩時間:
 *   - 必須
 *   - 1分以上90分以下
 * - サイクル数:
 *   - 必須
 *   - 1以上10以下
 */
export const timerSettingsFormSchema = z.object({
  focusTime: z.coerce
    .number()
    .min(1, "集中時間は1分以上で入力してください")
    .max(90, "集中時間は90分以下で入力してください"),
  shortBreakTime: z.coerce
    .number()
    .min(1, "短い休憩時間は1分以上で入力してください")
    .max(30, "短い休憩時間は30分以下で入力してください"),
  longBreakTime: z.coerce
    .number()
    .min(1, "長い休憩時間は1分以上で入力してください")
    .max(90, "長い休憩時間は90分以下で入力してください"),
  cycles: z.coerce
    .number()
    .min(1, "サイクル数は1以上で入力してください")
    .max(10, "サイクル数は10以下で入力してください"),
});
