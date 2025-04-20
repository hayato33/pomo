import { prisma } from "@/app/_lib/prisma";
import { CategoryStats } from "@/app/api/pomodoro/_types/categoryStats";

/**
 * 指定した期間における各カテゴリごとの
 * - categoryName: カテゴリ名
 * - totalTime: completedTime * completedCount の合計（分）
 * - percentage: 総合計に対するパーセンテージ（小数第1位まで）
 */
export async function getTotalTimeByCategory(
  userId: string,
  period: "day" | "week" | "month" | "year"
) {
  return prisma.$queryRaw<CategoryStats[]>`
    WITH category_totals AS (
      SELECT
        COALESCE(cat.name, '未分類') AS "categoryName",
        SUM(p_log."completedTime" * p_log."completedCount")::numeric AS "totalTime"
      FROM "PomodoroLog" AS p_log
      LEFT JOIN "PomoCategory" AS pc ON p_log.id = pc."pomodoroLogId"
      LEFT JOIN "Category" AS cat ON pc."categoryId" = cat.id
      WHERE p_log."userId" = ${userId}
        AND p_log."loggedAt" >= DATE_TRUNC(${period}, (NOW() AT TIME ZONE 'Asia/Tokyo')::date)
      GROUP BY COALESCE(cat.name, '未分類')
    ),
    total_sum AS (
      SELECT SUM("totalTime")::numeric AS grand_total
      FROM category_totals
    )
    SELECT
      category_totals."categoryName",
      category_totals."totalTime",
      CASE
        WHEN total_sum.grand_total > 0
        THEN ROUND(category_totals."totalTime" / total_sum.grand_total * 100, 1)::numeric
        ELSE 0
      END AS "percentage"
    FROM category_totals
		CROSS JOIN total_sum
    ORDER BY category_totals."totalTime" DESC;
  `;
}
