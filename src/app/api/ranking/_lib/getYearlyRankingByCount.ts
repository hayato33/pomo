import { prisma } from "@/app/_lib/prisma";
import { YearlyRankingByCount } from "@/app/_types/ranking";

export async function getYearlyRankingByCount() {
  return await prisma.$queryRaw<YearlyRankingByCount[]>`
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
		yearly_logs AS (
				SELECT
					"userId" AS user_id,
					SUM("completedCount")::numeric AS yearly_count
				FROM "PomodoroLog"
				WHERE "loggedAt" >= DATE_TRUNC('year', CURRENT_DATE)
				GROUP BY user_id
		)
		SELECT 
			id,
			nickname,
			profile_image_key,
			yearly_count
		FROM users
		RIGHT JOIN user_settings ON user_settings.user_id = users.id
		LEFT JOIN yearly_logs ON yearly_logs.user_id = users.id
		WHERE yearly_count > 0
		ORDER BY yearly_count DESC
	`;
}
