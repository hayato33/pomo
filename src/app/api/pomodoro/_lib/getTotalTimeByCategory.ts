import { prisma } from "@/app/_lib/prisma";
import { CategoryStats } from "@/app/_types/category";
/**
 * 指定した期間における各カテゴリごとの統計情報を取得
 * 合計時間の上位5カテゴリを表示し、残りは「その他」として集計
 * - categoryName: カテゴリ名（上位5件または「その他」）
 * - totalTime: completedTime * completedCount の合計（分）
 * - percentage: 総合計に対するパーセンテージ（小数第1位まで）
 */
export async function getTotalTimeByCategory(
  userId: string,
  period: "day" | "week" | "month" | "year"
) {
  return prisma.$queryRaw<CategoryStats[]>`
    WITH category_totals AS (
      -- 各カテゴリの合計時間を計算
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
    ranked_categories AS (
      -- 合計時間に基づいてランク付け
      SELECT
        "categoryName",
        "totalTime",
        ROW_NUMBER() OVER (ORDER BY "totalTime" DESC) as category_rank
      FROM category_totals
    ),
    grouped_categories AS (
      -- 上位5カテゴリと「その他」にグループ化して合算
      SELECT
        CASE
          WHEN category_rank <= 5 THEN "categoryName"
          ELSE 'その他'
        END AS "categoryName",
        SUM("totalTime")::numeric AS "totalTime"
      FROM ranked_categories
      GROUP BY
        CASE
          WHEN category_rank <= 5 THEN "categoryName"
          ELSE 'その他'
        END
    ),
    total_sum AS (
      -- グループ化後の総計を計算
      SELECT SUM("totalTime")::numeric AS grand_total
      FROM grouped_categories
    )
    -- 最終的な結果を選択し、割合を計算
    SELECT
      grouped_category_data."categoryName",
      grouped_category_data."totalTime",
      CASE
        WHEN total_data.grand_total > 0
        THEN ROUND(grouped_category_data."totalTime" / total_data.grand_total * 100, 1)::numeric
        ELSE 0
      END AS "percentage"
    FROM grouped_categories AS grouped_category_data
    CROSS JOIN total_sum AS total_data
    -- 「その他」を最後に、それ以外は合計時間の降順でソート
    ORDER BY
      CASE
        WHEN grouped_category_data."categoryName" = 'その他' THEN 1
        ELSE 0
      END,
      grouped_category_data."totalTime" DESC;
  `;
}
