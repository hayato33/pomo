import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../_lib/getCurrentUser";
import { getDailyRankingByCount } from "./_lib/getDailyRankingByCount";
import { getDailyRankingByTime } from "./_lib/getDailyRankingByTime";
import { getMonthlyRankingByCount } from "./_lib/getMonthlyRankingByCount";
import { getMonthlyRankingByTime } from "./_lib/getMonthlyRankingByTime";
import { getWeeklyRankingByCount } from "./_lib/getWeeklyRankingByCount";
import { getWeeklyRankingByTime } from "./_lib/getWeeklyRankingByTime";
import { getYearlyRankingByCount } from "./_lib/getYearlyRankingByCount";
import { getYearlyRankingByTime } from "./_lib/getYearlyRankingByTime";
import { GetRankingResponse } from "@/app/_types/ranking";
export const dynamic = "force-dynamic";

/** ランキングを取得するAPIエンドポイント */
export const GET = async (req: NextRequest) => {
  try {
    const { currentUser } = await getCurrentUser(req);

    // ユーザーが見つからない場合はエラーを返す
    if (!currentUser)
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );

    const [
      dailyRankingByCount,
      dailyRankingByTime,
      monthlyRankingByCount,
      monthlyRankingByTime,
      weeklyRankingByCount,
      weeklyRankingByTime,
      yearlyRankingByCount,
      yearlyRankingByTime,
    ] = await Promise.all([
      getDailyRankingByCount(),
      getDailyRankingByTime(),
      getMonthlyRankingByCount(),
      getMonthlyRankingByTime(),
      getWeeklyRankingByCount(),
      getWeeklyRankingByTime(),
      getYearlyRankingByCount(),
      getYearlyRankingByTime(),
    ]);

    // 成功レスポンスを返す
    return NextResponse.json<GetRankingResponse>(
      {
        status: "success",
        message: "ランキングデータを取得しました",
        data: {
          dailyRankingByCount,
          dailyRankingByTime,
          monthlyRankingByCount,
          monthlyRankingByTime,
          weeklyRankingByCount,
          weeklyRankingByTime,
          yearlyRankingByCount,
          yearlyRankingByTime,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
