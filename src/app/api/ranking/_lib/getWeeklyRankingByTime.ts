import { prisma } from "@/app/_lib/prisma";
import { WeeklyRankingByTime } from "@/app/_types/ranking";

export async function getWeeklyRankingByTime() {
  return await prisma.$queryRaw<WeeklyRankingByTime[]>`
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
		weekly_logs AS (
				SELECT
					"userId" AS user_id,
					SUM("completedTime" * "completedCount")::numeric AS weekly_time
				FROM "PomodoroLog"
				WHERE "loggedAt" >= DATE_TRUNC('week', CURRENT_DATE)
				GROUP BY user_id
		)
		SELECT 
			id,
			nickname,
			profile_image_key,
			weekly_time
		FROM users
		RIGHT JOIN user_settings ON user_settings.user_id = users.id
		LEFT JOIN weekly_logs ON weekly_logs.user_id = users.id
		WHERE weekly_time > 0
		ORDER BY weekly_time DESC
	`;
}
