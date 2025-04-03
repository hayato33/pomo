"use client";

import Link from "next/link";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { TbSettings } from "react-icons/tb";
import { MdOutlineFeedback } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { supabase } from "@/app/_utils/supabase";
import UserProfileImage from "../elements/UserProfileImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/DropdownMenu";

/** ユーザーメニューを表示するドロップダウンコンポーネント */
export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <UserProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer px-4 py-2">
          <Link
            href="/settings"
            className="flex items-center gap-2 text-base"
            onClick={handleClose}
          >
            <TbSettings size={18} />
            設定ページ
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer px-4 py-2">
          <Link
            href=""
            target="_blank"
            className="flex items-center gap-2 text-base"
            onClick={handleClose}
          >
            <MdOutlineFeedback size={18} />
            <div className="flex items-center gap-1">
              フィードバック
              <FiExternalLink size={12} />
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer px-4 py-2 text-base"
          onClick={handleLogout}
        >
          <LuLogOut size={18} />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
