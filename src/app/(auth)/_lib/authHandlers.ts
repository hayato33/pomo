import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormData } from "./authSchema";
import { ensureUserExists } from "./authUserService";
import { supabase } from "@/app/_utils/supabase";

/**
 * ログイン成功時の処理
 * @param accessToken アクセストークン
 * @param router Next.jsのルーターインスタンス
 */
export const handleLoginSuccess = async (
  accessToken: string,
  router: AppRouterInstance
): Promise<void> => {
  try {
    // ユーザーの存在確認と作成
    await ensureUserExists(accessToken);

    // ホームページにリダイレクト
    router.replace("/");
  } catch (error) {
    console.error("ログインプロセス中にエラーが発生しました:", error);
    alert("ログイン処理中にエラーが発生しました。もう一度お試しください。");
  }
};

/**
 * サインアップ成功時の処理
 * @param user ユーザー情報
 * @param reset フォームリセット関数
 */
export const handleSignupSuccess = (
  user: { identities?: Array<{ id: string; provider: string }> | null } | null,
  reset: () => void
): void => {
  // 登録されているメールアドレスの場合、空の配列が返ってくる
  if (user?.identities?.length === 0) {
    alert("このメールアドレスは既に登録されています。");
  } else {
    alert(
      "登録確認メールを送信しました。メールを確認してログインしてください。"
    );
  }

  reset();
};

/**
 * フォーム送信処理
 * @param formData フォームデータ
 * @param formType フォームの種類（login/signup）
 * @param router Next.jsのルーターインスタンス
 * @param reset フォームリセット関数
 */
export const onSubmitHandler = async (
  formData: FormData,
  formType: "login" | "signup",
  router: AppRouterInstance,
  reset: () => void
) => {
  try {
    const { data, error } =
      formType === "login"
        ? await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
        : await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              emailRedirectTo: `${window.location.origin}/login`,
            },
          });

    if (error) {
      let errorMessage = "認証エラーが発生しました。";
      if (error.message.includes("credentials")) {
        errorMessage = "メールアドレスまたはパスワードが正しくありません。";
      }
      alert(errorMessage);
      return;
    }

    // ログインとサインアップで処理を分岐
    if (formType === "login") {
      // セッションからアクセストークンを取得
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        await handleLoginSuccess(session.access_token, router);
      }
    } else {
      handleSignupSuccess(data.user, reset);
    }
  } catch (error) {
    console.error("認証処理中にエラーが発生しました:", error);
    alert("処理中にエラーが発生しました。もう一度お試しください。");
  }
};
