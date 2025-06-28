"use client";

import { AuthForm } from "../_components/AuthForm";

/** メールアドレスとパスワードで新規登録し、確認メールを送信 */
export default function Page() {
  return <AuthForm formType="signup" />;
}
