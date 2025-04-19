import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { CategoryService } from "./_lib/CategoryService";
import { CategoryResponse, GetCategoriesResponse } from "./_types/response";

/** カテゴリーを作成するAPIエンドポイント */
export const POST = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const { name } = await req.json();

    // カテゴリーをデータベースに作成
    const category = await CategoryService.create({
      name,
      userId: currentUser.id,
    });

    // 成功レスポンスを返す
    return NextResponse.json<CategoryResponse>(
      {
        status: "success",
        message: "カテゴリーを作成しました",
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

/** カテゴリーを取得するAPIエンドポイント */
export const GET = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const categories = await CategoryService.findByUserId(currentUser.id);

    // 成功レスポンスを返す
    return NextResponse.json<GetCategoriesResponse>(
      {
        status: "success",
        message: "カテゴリーを取得しました",
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

/** カテゴリーを更新するAPIエンドポイント */
export const PUT = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const { id, name } = await req.json();

    // カテゴリーを更新
    const category = await CategoryService.update({
      id,
      name,
      userId: currentUser.id,
    });

    // 成功レスポンスを返す
    return NextResponse.json<CategoryResponse>(
      {
        status: "success",
        message: "カテゴリーを更新しました",
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

/** カテゴリーを削除するAPIエンドポイント */
export const DELETE = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const { id } = await req.json();

    // カテゴリーを削除
    const category = await CategoryService.delete(id, currentUser.id);

    // 成功レスポンスを返す
    return NextResponse.json<CategoryResponse>(
      {
        status: "success",
        message: "カテゴリーを削除しました",
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
