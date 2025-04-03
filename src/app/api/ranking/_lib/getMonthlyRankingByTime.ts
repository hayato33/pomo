import { prisma } from "@/app/_lib/prisma";
import { MonthlyRankingByTime } from "@/app/_types/ranking";

export async function getMonthlyRankingByTime() {
  return await prisma.$queryRaw<MonthlyRankingByTime[]>`
		WITH users AS (
			SELECT
				"id" AS id,
				"nickname" AS nickname,
				"profileImageKey" AS profile_image_key
			FROM "User"
		),
		user_settings AS (
			SELECT
				"userId" AS user_id,
				"showOnRanking" AS show_on_ranking
			FROM "UserSetting"
			WHERE
				"showOnRanking" = true
		),
		monthly_logs AS (
				SELECT
					"userId" AS user_id,
					SUM("completedTime" * "completedCount")::numeric AS monthly_time
				FROM "PomodoroLog"
				WHERE "loggedAt" >= DATE_TRUNC('month', CURRENT_DATE)
				GROUP BY user_id
		)
		SELECT 
			id,
			nickname,
			profile_image_key,
			monthly_time,
			RANK() OVER(ORDER BY monthly_time DESC)::numeric AS rank
		FROM users
		RIGHT JOIN user_settings ON user_settings.user_id = users.id
		LEFT JOIN monthly_logs ON monthly_logs.user_id = users.id
		WHERE monthly_time > 0
		ORDER BY monthly_time DESC
	`;
}
