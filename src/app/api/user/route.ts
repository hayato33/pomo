import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/_utils/supabase";
import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { User } from "@prisma/client";

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

/** ユーザー情報を更新するAPIエンドポイント */
export const PUT = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const body = await req.json();

    // ユーザー情報を更新
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        ...body,
      },
    });

    interface ResponseType {
      status: string;
      message: string;
      data: User;
    }

    // 成功レスポンスを返す
    return NextResponse.json<ResponseType>(
      {
        status: "success",
        message: "ユーザーを更新しました",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
