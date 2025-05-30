import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { DEFAULT_USER_SETTINGS } from "@/app/_config/userSettingConfig";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { SettingResponse, UpdateUserSetting } from "@/app/_types/setting";
import { UpdateSettingResponseType } from "./_types/response";
import { settingSchema } from "@/app/(protected)/settings/_lib/settingFormSchema";
import { fromZodError } from "zod-validation-error";
import { ValidationError } from "@/app/_types/response";
import { SettingService } from "./_lib/SettingService";

/** ユーザー設定を作成するAPIエンドポイント */
export const POST = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    // ユーザー設定をデータベースに作成
    const userSetting = await prisma.userSetting.create({
      data: {
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        ...DEFAULT_USER_SETTINGS,
      },
    });

    // 成功レスポンスを返す
    return NextResponse.json<SettingResponse>(
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
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    // ユーザー設定をデータベースから取得
    const userSetting = await prisma.userSetting.findUnique({
      where: { userId: currentUser.id },
    });

    // ユーザー設定が見つからない場合はエラーを返す
    if (!userSetting)
      return NextResponse.json(
        { error: "ユーザー設定が見つかりません" },
        { status: 404 }
      );

    // 成功レスポンスを返す
    return NextResponse.json<SettingResponse>(
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

/** ユーザー設定を更新するAPIエンドポイント */
export const PUT = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const body: UpdateUserSetting = await req.json();

    // バリデーション
    const result = settingSchema.safeParse(body);
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

    // ユーザー設定を更新
    const userSetting = await SettingService.update({
      userId: currentUser.id,
      body: result.data,
    });

    // 成功レスポンスを返す
    return NextResponse.json<UpdateSettingResponseType>(
      {
        status: "success",
        message: "ユーザー設定を更新しました",
        data: userSetting,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
