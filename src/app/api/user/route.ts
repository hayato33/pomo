import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/_utils/supabase";
import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { UpdateUserResponseType } from "./_types/response";
import { UpdateUser } from "@/app/_types/user";
import { userSchema } from "@/app/settings/_lib/settingFormSchema";
import { fromZodError } from "zod-validation-error";
import { ValidationError } from "@/app/_types/response";
import { UserService } from "./_lib/UserService";

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

    const body: UpdateUser = await req.json();

    // バリデーション
    const result = userSchema.safeParse(body);
    if (!result.success) {
      const validationError = fromZodError(result.error);
      return NextResponse.json<ValidationError>(
        {
          status: "error",
          message: "入力内容に問題があります",
          errors: validationError.details || validationError.message,
        },
        { status: 400 }
      );
    }

    // ユーザー情報を更新
    const user = await UserService.update({
      id: currentUser.id,
      body: result.data,
    });

    // 成功レスポンスを返す
    return NextResponse.json<UpdateUserResponseType>(
      {
        status: "success",
        message: "ユーザー情報を更新しました",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
