import { prisma } from "@/app/_lib/prisma";
import { PeriodicPomoData } from "@/app/_types/pomodoro";

/**
 * 週単位のポモドーロデータを取得
 * @param userId - ユーザーID
 * @param offset - 現在の週からのオフセット（0=今週(デフォルト)、-1=先週、1=来週）
 * @returns - 日付範囲内の日別データ配列
 */
export async function getWeeklyDataSQL(userId: string, offset: number = 0) {
  return await prisma.$queryRaw<PeriodicPomoData[]>`
    -- 週の開始日と終了日を計算
    WITH week_range AS (
      SELECT
        -- 週の開始日: offsetで指定された週の月曜日
        DATE_TRUNC('week', CURRENT_DATE + (${offset} * INTERVAL '1 week'))::date AS week_start,
        -- 週の終了日: 開始日から6日後（日曜日）
        (DATE_TRUNC('week', CURRENT_DATE + (${offset} * INTERVAL '1 week'))::date + INTERVAL '6 days')::date AS week_end
    ),
    -- 週の範囲内の全日付を生成（月曜日から日曜日まで）
    all_dates AS (
      SELECT generate_series(
        (SELECT week_start FROM week_range),
        (SELECT week_end FROM week_range),
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
        AND "loggedAt" >= (SELECT week_start FROM week_range)
        AND "loggedAt" < (SELECT week_end FROM week_range) + INTERVAL '1 day'
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
