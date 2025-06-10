import { Button } from "@/app/_components/elements/Button";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

interface FormActionsProps {
  formType: "login" | "signup";
  isSubmitting: boolean;
}

/** 認証フォームのテキスト定義 */
const AUTH_ACTIONS_CONFIG = {
  login: {
    buttonText: "ログイン",
    guidanceText: "アカウントをお持ちでない方は",
    linkHref: "/signup",
    linkText: "登録",
  },
  signup: {
    buttonText: "登録",
    guidanceText: "アカウントをお持ちの方は",
    linkHref: "/login",
    linkText: "ログイン",
  },
} as const;

/** フォームアクションコンポーネント */
export default function FormActions({
  formType,
  isSubmitting,
}: FormActionsProps) {
  // フォームタイプに応じた設定を取得
  const config = AUTH_ACTIONS_CONFIG[formType];

  // 送信中の場合はボタンテキストを上書き
  const buttonText = isSubmitting ? "送信中..." : config.buttonText;

  return (
    <>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {buttonText}
      </Button>
      <Text size="2" as="p" className="mt-2">
        {config.guidanceText}
        <Link href={config.linkHref} className="ml-1 text-blue-500 underline">
          {config.linkText}
        </Link>
      </Text>
    </>
  );
}
