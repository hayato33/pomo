"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useNavItems } from "@/app/_hooks/useNavItems";

/**
 * モバイル用ナビゲーションコンポーネント
 * 画面下部に固定表示
 */
export function MobileNav() {
  const pathname = usePathname();
  const { session } = useSupabaseSession();
  const navItems = useNavItems();
  if (!session) return;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-center border-t border-gray-200 bg-white sm:hidden">
      <ul className="flex size-full justify-around">
        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative flex-1">
                <Link
                  href={item.href}
                  className={`flex size-full flex-col items-center justify-center py-2 transition-all duration-200 ${
                    isActive ? "font-bold" : ""
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gray-900" />
                  )}
                  <item.icon size={24} />
                  <span className="mt-1 text-xs">{item.label}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

/**
 * デスクトップ用ナビゲーションコンポーネント
 * ヘッダー内に水平表示
 */
export function DesktopNav() {
  const pathname = usePathname();
  const { session } = useSupabaseSession();
  const navItems = useNavItems();
  if (!session) return;
  return (
    <nav className="hidden sm:block">
      <ul className="flex">
        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-2 p-4 ${
                    isActive &&
                    "font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gray-900 after:content-['']"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
