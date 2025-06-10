import { Button } from "@/app/_components/elements/Button";
import Link from "next/link";
import { useGuestLogin } from "@/app/_hooks/useGuestLogin";

export default function Buttons() {
  const { guestLogin } = useGuestLogin();

  return (
    <>
      <Link
        href="/signup"
        className="flex h-10 w-full items-center justify-center rounded-md bg-gray-800 px-4 font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-gray-900 md:w-36"
      >
        ユーザー登録
      </Link>
      <Link
        href="/login"
        className="flex h-10 w-full items-center justify-center rounded-md bg-gray-800 px-4 font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-gray-900 md:w-36"
      >
        ログイン
      </Link>
      <Button
        className="w-full transition-transform hover:scale-105 md:w-36"
        variant="outline"
        onClick={guestLogin}
      >
        ゲストログイン
      </Button>
    </>
  );
}
