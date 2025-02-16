"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import PasswordInput from "./PasswordInput";

/**
 * 認証フォームのバリデーションスキーマ
 * - メールアドレス:
 *   - 必須
 *   - 有効なメールアドレス形式
 * - パスワード:
 *   - 8文字以上
 *   - 英数字記号を含む
 */
const schema = z.object({
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
export type FormData = z.infer<typeof schema>;

interface AuthFormProps {
  /** ログインまたは新規登録 */
  formType: "login" | "signup";
  /** フォーム送信時の処理 */
  onSubmit: (data: FormData) => Promise<void>;
}

/**
 * ログインと新規登録で共通して使用されるフォームコンポーネント
 * React Hook FormとZodによるバリデーション、パスワードの表示切り替え機能付き
 */
export default function AuthForm({ formType, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  /** フォーム送信処理 */
  const onSubmitHandler = async (data: FormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-4 my-12 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full max-w-[400px] space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="name@company.com"
            disabled={isSubmitting}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <PasswordInput
          register={register}
          error={errors.password}
          isSubmitting={isSubmitting}
          showRequirements={formType === "signup"}
          watch={watch}
        />

        <div>
          <Button
            size="3"
            className="w-full"
            type="submit"
            color="gray"
            variant="solid"
            highContrast
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "送信中..."
              : formType === "login"
                ? "ログイン"
                : "登録"}
          </Button>
          <Text size="2" as="p" className="mt-2">
            {formType === "login"
              ? "アカウントをお持ちでない方は"
              : "アカウントをお持ちの方は"}
            <Link
              href={formType === "login" ? "/signup" : "/login"}
              className="text-blue-500 underline"
            >
              {formType === "login" ? "登録" : "ログイン"}
            </Link>
          </Text>
        </div>
      </form>
    </div>
  );
}
