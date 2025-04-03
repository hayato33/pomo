"use client";

import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { LuLogIn } from "react-icons/lu";
import { Skeleton } from "@radix-ui/themes";
import { DesktopNav } from "./Nav";
import UserMenu from "./UserMenu";

export default function Header() {
  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="sticky left-0 right-0 top-0 z-10 h-14 bg-white/80 p-4 backdrop-blur-sm sm:py-0">
      <div className="flex size-full items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Pomo!</h1>
        </Link>
        <DesktopNav />
        {isLoading && (
          <Skeleton width="40px" height="40px" className="rounded-full" />
        )}
        {!isLoading && (
          <div className="flex items-center gap-4">
            {session ? (
              <UserMenu />
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
