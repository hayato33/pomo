"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import AuthForm, { type FormData } from "../_components/AuthForm";

/** メールアドレスとパスワードでログインし、成功時はホームページへリダイレクト */
export default function Page() {
  const router = useRouter();

  /** ログイン処理を実行し、結果に応じてメッセージを表示 */
  const handleSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert("ログインに失敗しました");
    } else {
      router.replace("/");
    }
  };

  return <AuthForm formType="login" onSubmit={handleSubmit} />;
}
