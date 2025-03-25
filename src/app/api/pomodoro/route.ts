import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { PomodoroStatsResponseType } from "./_types/response";
import { getStatsData } from "./_lib/getStatsData";
import { getWeeklyData, getMonthlyData } from "./_lib/getPeriodicData";

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

    const [statsData, weeklyData, monthlyData] = await Promise.all([
      getStatsData(currentUser.id),
      getWeeklyData(currentUser.id),
      getMonthlyData(currentUser.id),
    ]);

    const responseData = {
      totalCompletedCount: statsData.totalCompletedCount,
      totalTime: statsData.totalTime,
      totalDays: statsData.totalDays,
      averageTimePerDay: statsData.averageTimePerDay,
      weeklyData: weeklyData,
      monthlyData: monthlyData,
    };

    return NextResponse.json<PomodoroStatsResponseType>(
      {
        status: "success",
        message: "ポモドーロログを取得しました",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
