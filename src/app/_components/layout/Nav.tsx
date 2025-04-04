"use client";

import Link from "next/link";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiTimelineView } from "react-icons/ri";
// import { FaRankingStar } from "react-icons/fa6";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

/** ナビゲーション項目の型定義 */
interface NavItem {
  /** ページのパス */
  href: string;
  /** アイコンコンポーネント */
  icon: IconType;
  /** 表示テキスト */
  label: string;
}

/** ナビゲーション項目の定義 */
const NAV_ITEMS: NavItem[] = [
  {
    href: "/timer",
    icon: IoTimerOutline,
    label: "タイマー",
  },
  {
    href: "/analysis",
    icon: MdOutlineAnalytics,
    label: "分析",
  },
  {
    href: "/timeline",
    icon: RiTimelineView,
    label: "タイムライン",
  },
  // {
  //   href: "/ranking",
  //   icon: FaRankingStar,
  //   label: "ランキング",
  // },
];

/**
 * モバイル用ナビゲーションコンポーネント
 * 画面下部に固定表示
 */
export function MobileNav() {
  const pathname = usePathname();
  const { session } = useSupabaseSession();
  if (!session) return;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-center border-t border-gray-200 bg-white sm:hidden">
      <ul className="flex size-full justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="relative flex-1">
              <Link
                href={item.href}
                className={`flex size-full flex-col items-center justify-center py-2 transition-all duration-200 ${
                  isActive ? "font-bold" : ""
                }`}
              >
                {/* アクティブインジケーター */}
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
  if (!session) return;
  return (
    <nav className="hidden sm:block">
      <ul className="flex">
        {NAV_ITEMS.map((item) => {
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
