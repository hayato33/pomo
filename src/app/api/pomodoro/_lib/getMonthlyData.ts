import { prisma } from "@/app/_lib/prisma";
import { PeriodicPomoData } from "@/app/_types/pomodoro";

/**
 * 月単位のポモドーロデータを取得
 * @param userId - ユーザーID
 * @param offset - 現在の月からのオフセット（0=今月(デフォルト)、-1=先月、1=来月）
 * @returns - 日付範囲内の日別データ配列
 */
export async function getMonthlyDataSQL(userId: string, offset: number = 0) {
  return await prisma.$queryRaw<PeriodicPomoData[]>`
    -- 月の開始日と終了日を計算
    WITH month_range AS (
      SELECT
        -- 月の開始日: offsetで指定された月の1日
        DATE_TRUNC('month', CURRENT_DATE + (${offset} * INTERVAL '1 month'))::date AS month_start,
        -- 月の終了日: 翌月の1日から1日引く
        (DATE_TRUNC('month', CURRENT_DATE + (${offset} * INTERVAL '1 month'))::date + INTERVAL '1 month' - INTERVAL '1 day')::date AS month_end
    ),
    -- 月の範囲内の全日付を生成（1日から月末まで）
    all_dates AS (
      SELECT generate_series(
        (SELECT month_start FROM month_range),
        (SELECT month_end FROM month_range),
        '1 day'::interval
      )::date AS date
    ),
    -- 各日のポモドーロ記録を集計
    daily_logs AS (
      SELECT
        DATE_TRUNC('day', "loggedAt")::date AS date,
        SUM("completedTime" * "completedCount") AS time,
        SUM("completedCount") AS count
      FROM "PomodoroLog"
      WHERE 
        "userId" = ${userId}
        AND "loggedAt" >= (SELECT month_start FROM month_range)
        AND "loggedAt" < ((SELECT month_end FROM month_range) + INTERVAL '1 day')
      GROUP BY date
    )
    -- 最終的な結果を生成（データがない場合は0として扱う）
    SELECT
      to_char(all_dates.date, 'yyyy/mm/dd') AS date,
      COALESCE(daily_logs.time, 0)::numeric AS time,
      COALESCE(daily_logs.count, 0)::numeric AS count
    FROM all_dates
    LEFT JOIN daily_logs ON all_dates.date = daily_logs.date
    ORDER BY all_dates.date
  `;
}
