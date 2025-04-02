import { z } from "zod";

/**
 * 認証フォームのバリデーションスキーマ
 * - メールアドレス:
 *   - 必須
 *   - 有効なメールアドレス形式
 * - パスワード:
 *   - 8文字以上
 *   - 英数字記号を含む
 */
export const authSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "パスワードには英字、数字、記号を含める必要があります"
    ),
});

/** バリデーションスキーマから推論された型 */
export type FormData = z.infer<typeof authSchema>;

/** フォームの種類 */
export type FormType = "login" | "signup";
