import { prisma } from "@/app/_lib/prisma";

interface StatsData {
  total_completed_count: number;
  total_time: number;
  total_days: number;
  average_time_per_day: number;
}

export async function getStatsData(userId: string) {
  const statsData = await prisma.$queryRaw<StatsData[]>`
      WITH summary AS (
        SELECT 
          -- 総ポモドーロ回数（NULLの場合は0）
          COALESCE(SUM("completedCount"), 0) AS total_completed_count,
          
          -- 総集中時間 = 完了時間×完了回数の合計（NULLの場合は0）
          COALESCE(SUM("completedTime" * "completedCount"), 0) AS total_time,
          
          -- 総日数（日付をyyyy/mm/dd形式に変換して重複排除の上、カウント）
          COUNT(DISTINCT(to_char("loggedAt", 'yyyy/mm/dd'))) AS total_days
        FROM "PomodoroLog"
        WHERE "userId" = ${userId}
      )
      SELECT
        total_completed_count,
        total_time,
        total_days,
        -- 1日あたりの平均集中時間
        CASE 
          WHEN total_days > 0 
          THEN ROUND(total_time / total_days)
          ELSE 0 
        END AS average_time_per_day
      FROM summary
    `;

  return {
    totalCompletedCount: Number(statsData[0].total_completed_count),
    totalTime: Number(statsData[0].total_time),
    totalDays: Number(statsData[0].total_days),
    averageTimePerDay: Number(statsData[0].average_time_per_day),
  };
}
