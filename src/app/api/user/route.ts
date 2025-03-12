import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/_utils/supabase";
import { prisma } from "@/app/_lib/prisma";

/** ユーザーを作成するAPIエンドポイント */
export const POST = async (req: NextRequest) => {
  try {
    const token = req.headers.get("Authorization") ?? "";
    const { data, error } = await supabase.auth.getUser(token);

    // 認証エラーがあれば早期リターン
    if (error)
      return NextResponse.json({ error: error.message }, { status: 401 });

    const supabaseUserId = data.user.id;
    const { nickname } = await req.json();

    // ユーザーをデータベースに作成
    const user = await prisma.user.create({
      data: {
        supabaseUserId,
        nickname,
      },
    });

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        status: "success",
        message: "ユーザーを作成しました",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

/** ユーザーを取得するAPIエンドポイント */
export const GET = async (req: NextRequest) => {
  try {
    const token = req.headers.get("Authorization") ?? "";
    const { data, error } = await supabase.auth.getUser(token);

    // 認証エラーがあれば早期リターン
    if (error)
      return NextResponse.json({ error: error.message }, { status: 401 });

    const supabaseUserId = data.user.id;

    // ユーザーをデータベースから取得
    const user = await prisma.user.findUnique({
      where: { supabaseUserId },
    });

    // ユーザーが見つからない場合はエラーを返す
    if (!user)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        status: "success",
        message: "ユーザーを取得しました",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
