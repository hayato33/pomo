"use client";

import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { supabase } from "@/utils/supabase";
import { Avatar, Button } from "@radix-ui/themes";

export default function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="sticky left-0 right-0 top-0 z-10 bg-white/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Pomo!</h1>
        </Link>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/timer">タイマー</Link>
            </li>
            <li>
              <Link href="/analysis">分析</Link>
            </li>
            <li>
              <Link href="/timeline">タイムライン</Link>
            </li>
            <li>
              <Link href="/ranking">ランキング</Link>
            </li>
          </ul>
        </nav>

        {!isLoading && (
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/settings">
                  <IoSettingsOutline size={24} />
                </Link>
                <div className="group relative flex items-center gap-2">
                  <Avatar
                    size="2"
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    radius="full"
                    variant="solid"
                    color="gray"
                    fallback={
                      session.user?.email
                        ? session.user.email[0].toUpperCase()
                        : "?"
                    }
                    highContrast
                  />
                  <Button
                    size="3"
                    className="absolute right-0 top-full hidden w-[128px] cursor-pointer group-hover:flex"
                    color="gray"
                    variant="solid"
                    highContrast
                    onClick={handleLogout}
                  >
                    ログアウト
                    <LuLogOut />
                  </Button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg border border-gray-900 px-4 py-2 transition-colors hover:bg-gray-900 hover:text-white"
              >
                <LuLogIn />
                ログイン
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
