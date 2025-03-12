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
