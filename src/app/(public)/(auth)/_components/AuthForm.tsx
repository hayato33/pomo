"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import AuthFormItem from "./AuthFormItem";
import PasswordInput from "./PasswordInput";
import FormActions from "./FormActions";
import { authSchema, FormData, FormType } from "../_lib/authSchema";
import { loginHandler, signupHandler } from "@/app/_lib/authHandlers";

/**
 * ログインと新規登録で共通して使用されるフォームコンポーネント
 * React Hook FormとZodによるバリデーション、パスワードの表示切り替え機能付き
 */
export default function AuthForm({ formType }: { formType: FormType }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
    mode: "onTouched",
  });
  const router = useRouter();

  /**
   * フォーム送信イベントハンドラ
   * @param formData フォームデータ
   */
  const submitHandler = async (formData: FormData) => {
    if (formType === "login") {
      await loginHandler(formData, router);
    } else {
      await signupHandler(formData, reset);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-[400px] space-y-6"
      >
        <AuthFormItem
          id="email"
          label="メールアドレス"
          type="email"
          placeholder="name@company.com"
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />

        <PasswordInput
          register={register}
          error={errors.password}
          isSubmitting={isSubmitting}
          showRequirements={formType === "signup"}
          watch={watch}
        />

        <FormActions formType={formType} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
