"use client";

import AuthForm from "../_components/AuthForm";

/** メールアドレスとパスワードでログインし、成功時はホームページへリダイレクト */
export default function Page() {
  return <AuthForm formType="login" />;
}
