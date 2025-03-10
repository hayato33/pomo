import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/_utils/supabase";
import { prisma } from "@/app/_lib/prisma";
import { DEFAULT_USER_SETTINGS } from "@/app/_config/userSettingConfig";

/** ユーザー設定を作成するAPIエンドポイント */
export const POST = async (req: NextRequest) => {
  try {
    const token = req.headers.get("Authorization") ?? "";
    const { error } = await supabase.auth.getUser(token);
    // 認証エラーがあれば早期リターン
    if (error)
      return NextResponse.json({ error: error.message }, { status: 401 });

    const { userId } = await req.json();

    // ユーザー設定をデータベースに作成
    const userSetting = await prisma.userSetting.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...DEFAULT_USER_SETTINGS,
      },
    });

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        status: "success",
        message: "ユーザー設定を作成しました",
        data: userSetting,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

/** ユーザー設定を取得するAPIエンドポイント */
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
      select: { id: true },
    });

    // ユーザーが見つからない場合はエラーを返す
    if (!user)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    // ユーザー設定をデータベースから取得
    const userSetting = await prisma.userSetting.findUnique({
      where: { userId: user.id },
    });

    // ユーザー設定が見つからない場合はエラーを返す
    if (!userSetting)
      return NextResponse.json(
        { error: "ユーザー設定が見つかりません" },
        { status: 404 }
      );

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        status: "success",
        message: "ユーザー設定を取得しました",
        data: userSetting,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
