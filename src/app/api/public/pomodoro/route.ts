import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

/** ポモドーロログを取得するAPIエンドポイント */
export const GET = async () => {
  try {
    // ユーザー設定をデータベースから取得
    const pomodoroLog = await prisma.pomodoroLog.findMany({
      where: {
        displayInTimeline: true,
      },
      include: {
        user: {
          select: {
            nickname: true,
            profileImageKey: true,
          },
        },
      },
    });

    // ユーザー設定が見つからない場合はエラーを返す
    if (!pomodoroLog)
      return NextResponse.json(
        { error: "ポモドーロログが見つかりません" },
        { status: 404 }
      );

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        status: "success",
        message: "すべてのポモドーロログを取得しました",
        data: pomodoroLog,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
