import { PeriodicPomoData } from "@/app/_types/pomodoro";
import { prisma } from "@/app/_lib/prisma";
import { getWeekDateRange } from "./getWeekDateRange";
import { getMonthDateRange } from "./getMonthDateRange";

/**
 * 指定された日付範囲のデータを取得
 * @param userId - ユーザーID
 * @param startDate - 開始日（YYYY-MM-DD形式）
 * @param endDate - 終了日（YYYY-MM-DD形式）
 * @returns - 日付範囲内の日別データ配列
 */
async function getDateRangeData(
  userId: string,
  startDate: string,
  endDate: string
): Promise<PeriodicPomoData[]> {
  return await prisma.$queryRaw<PeriodicPomoData[]>`
    -- 開始日から終了日までの連続した日付を生成
    WITH all_dates AS (
      SELECT generate_series(
        ${startDate}::date,
        ${endDate}::date,
        '1 day'::interval
      )::date AS date
    ),
    
    -- 各日付のログデータを集計
    daily_logs AS (
      SELECT
        DATE_TRUNC('day', "loggedAt")::date AS date,  -- タイムスタンプから日付部分のみを取得
        SUM("completedTime" * "completedCount") AS time,  -- 完了時間×完了回数の合計
        SUM("completedCount") AS count  -- 完了回数の合計
      FROM "PomodoroLog"
      WHERE 
        "userId" = ${userId}
        AND "loggedAt" >= ${startDate}::date
        AND "loggedAt" < ${endDate}::date + INTERVAL '1 day'
      GROUP BY date
    )
    
    -- 最終結果の取得: 全日付データと日別集計を結合
    SELECT
      to_char(all_dates.date, 'yyyy/mm/dd') AS date,  -- 日付をyyyy/mm/dd形式の文字列に変換
      COALESCE(daily_logs.time, 0)::numeric AS time,  -- ログがない日は0として扱う
      COALESCE(daily_logs.count, 0)::numeric AS count  -- ログがない日は0として扱う
    FROM all_dates
    LEFT JOIN daily_logs ON all_dates.date = daily_logs.date  -- 全日付データと日別集計を結合（データがない日も含める）
    ORDER BY all_dates.date  -- 日付順に並べ替え
  `;
}

export async function getWeeklyData(userId: string, offset: number = 0) {
  const { startDate, endDate } = getWeekDateRange(offset);
  return await getDateRangeData(userId, startDate, endDate);
}

export async function getMonthlyData(userId: string, offset: number = 0) {
  const { startDate, endDate } = getMonthDateRange(offset);
  return await getDateRangeData(userId, startDate, endDate);
}
