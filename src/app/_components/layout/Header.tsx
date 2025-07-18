"use client";

import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { LuLogIn } from "react-icons/lu";
import { Skeleton } from "@radix-ui/themes";
import { DesktopNav } from "./Nav";
import { UserMenu } from "./UserMenu";
import { Work_Sans } from "next/font/google";
import { ModeToggle } from "../elements/ModeToggle";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export const Header: React.FC = () => {
  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="sticky left-0 right-0 top-0 z-10 h-14 bg-white/80 p-4 backdrop-blur-sm dark:bg-black/80 sm:py-0">
      <div className="flex size-full items-center justify-between">
        <Link href="/">
          <h1 className={`${workSans.className} text-2xl font-bold`}>Pomo!</h1>
        </Link>
        <DesktopNav />
        {isLoading && (
          <Skeleton width="40px" height="40px" className="rounded-full" />
        )}
        {!isLoading && (
          <div className="flex items-center gap-6">
            {session ? (
              <>
                <ModeToggle />
                <UserMenu />
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
};
