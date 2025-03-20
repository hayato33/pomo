import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { calcPomoStats } from "@/app/analysis/_lib/stats";
import { PomodoroStatsResponseType } from "./_types/response";

/** ポモドーロログを作成するAPIエンドポイント */
export const POST = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const { completedCount, completedTime, displayInTimeline } =
      await req.json();

    // ポモドーロログをデータベースに作成
    const pomodoroLog = await prisma.pomodoroLog.create({
      data: {
        completedCount,
        completedTime,
        displayInTimeline,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        status: "success",
        message: "ポモドーロログを作成しました",
        data: pomodoroLog,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

/** ポモドーロログを取得するAPIエンドポイント */
export const GET = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    // ポモドーロログをデータベースから取得
    const pomodoroLog = await prisma.pomodoroLog.findMany({
      where: {
        userId: currentUser.id,
      },
      select: {
        completedTime: true,
        completedCount: true,
        loggedAt: true,
      },
    });

    // pomodoroLogを分析用データに変換
    const stats = calcPomoStats(pomodoroLog);

    // 成功レスポンスを返す
    return NextResponse.json<PomodoroStatsResponseType>(
      {
        status: "success",
        message: "ポモドーロログを取得しました",
        data: {
          ...stats,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
