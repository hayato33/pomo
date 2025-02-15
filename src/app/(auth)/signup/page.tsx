"use client";

import { supabase } from "@/utils/supabase";
import AuthForm, { type FormData } from "../_components/AuthForm";

/** メールアドレスとパスワードで新規登録し、確認メールを送信 */
export default function Page() {
  /** 新規登録処理を実行し、結果に応じてメッセージを表示 */
  const handleSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });
    if (error) {
      alert("登録に失敗しました");
    } else {
      alert("確認メールを送信しました。");
    }
  };

  return <AuthForm formType="signup" onSubmit={handleSubmit} />;
}
