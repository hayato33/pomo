import { prisma } from "@/app/_lib/prisma";
import { Ranking } from "@/app/_types/ranking";

export async function getDailyRankingByTime() {
  return await prisma.$queryRaw<Ranking[]>`
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
		daily_logs AS (
				SELECT
					"userId" AS user_id,
					SUM("completedTime" * "completedCount")::numeric AS value
				FROM "PomodoroLog"
				WHERE "loggedAt" >= DATE_TRUNC('day', CURRENT_DATE)
				GROUP BY user_id
		)
		SELECT 
			id,
			nickname,
			profile_image_key,
			value,
			RANK() OVER(ORDER BY value DESC)::numeric AS rank
		FROM users
		RIGHT JOIN user_settings ON user_settings.user_id = users.id
		LEFT JOIN daily_logs ON daily_logs.user_id = users.id
		WHERE value > 0
		ORDER BY value DESC
	`;
}
