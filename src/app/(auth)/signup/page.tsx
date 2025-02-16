"use client";

import { supabase } from "@/utils/supabase";
import AuthForm, { type FormData } from "../_components/AuthForm";

/** メールアドレスとパスワードで新規登録し、確認メールを送信 */
export default function Page() {
  /** 新規登録処理を実行し、結果に応じてメッセージを表示 */
  const handleSubmit = async (formData: FormData) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });

    if (error) {
      alert("登録に失敗しました");
      return;
    }

    // 登録されているメールアドレスの場合、空の配列が返ってくる
    const identities = data.user?.identities;
    if (identities?.length === 0) {
      alert("このメールアドレスは既に登録されています。");
    } else {
      alert("確認メールを送信しました。");
    }
  };

  return <AuthForm formType="signup" onSubmit={handleSubmit} />;
}
