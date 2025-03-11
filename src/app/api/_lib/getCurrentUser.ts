import { prisma } from "@/app/_lib/prisma";
import { supabase } from "@/app/_utils/supabase";
import { NextRequest } from "next/server";

/**
 * 現在のユーザーを取得する関数
 * @param req Nextリクエストオブジェクト
 * @returns 現在のユーザー情報
 */
export const getCurrentUser = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  // 認証エラーがあれば早期リターン
  if (error) throw new Error(error.message);

  const supabaseUserId = data.user.id;

  // ユーザーをデータベースから取得
  const currentUser = await prisma.user.findUnique({
    where: { supabaseUserId },
    select: { id: true },
  });
  return { currentUser };
};
