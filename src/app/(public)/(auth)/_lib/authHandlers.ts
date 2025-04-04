import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormData } from "./authSchema";
import { ensureUserExists } from "./authUserService";
import { supabase } from "@/app/_utils/supabase";
import { toast } from "react-toastify";

/**
 * ログイン成功時の処理
 * @param accessToken アクセストークン
 * @param router Next.jsのルーターインスタンス
 */
const handleLoginSuccess = async (
  accessToken: string,
  router: AppRouterInstance
): Promise<void> => {
  try {
    // ユーザーの存在確認と作成
    await ensureUserExists(accessToken);

    // ホームページにリダイレクト
    router.replace("/timer");
    toast.success("ログインに成功しました");
  } catch (error) {
    const errorMessage = "ログイン処理中にエラーが発生しました。";
    console.error(errorMessage, error);
    toast.error(`${errorMessage}もう一度お試しください。`);
  }
};

/**
 * サインアップ成功時の処理
 * @param user ユーザー情報
 * @param reset フォームリセット関数
 */
const handleSignupSuccess = (
  user: { identities?: Array<{ id: string; provider: string }> | null } | null,
  reset: () => void
): void => {
  // 登録されているメールアドレスの場合、空の配列が返ってくる
  if (user?.identities?.length === 0) {
    toast.warning("このメールアドレスは既に登録されています。");
  } else {
    toast.success(
      "登録確認メールを送信しました。メールを確認してログインしてください。"
    );
  }

  reset();
};

/**
 * ログイン処理
 * @param formData フォームデータ
 * @param router Next.jsのルーターインスタンス
 */
export const loginHandler = async (
  formData: FormData,
  router: AppRouterInstance
) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      let errorMessage = "認証エラーが発生しました。";
      if (error.message.includes("credentials")) {
        errorMessage = "メールアドレスまたはパスワードが正しくありません。";
      }
      toast.error(errorMessage);
      return;
    }

    // セッションからアクセストークンを取得
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      await handleLoginSuccess(session.access_token, router);
    }
  } catch (error) {
    console.error("ログイン処理中にエラーが発生しました:", error);
    toast.error("処理中にエラーが発生しました。もう一度お試しください。");
  }
};

/**
 * サインアップ処理
 * @param formData フォームデータ
 * @param reset フォームリセット関数
 */
export const signupHandler = async (formData: FormData, reset: () => void) => {
  try {
    const { data, error } = await supabase.auth.signUp({
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
      toast.error(errorMessage);
      return;
    }

    handleSignupSuccess(data.user, reset);
  } catch (error) {
    console.error("サインアップ処理中にエラーが発生しました:", error);
    toast.error("処理中にエラーが発生しました。もう一度お試しください。");
  }
};
