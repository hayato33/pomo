import { Ranking } from "@/app/_types/ranking";

/** ランキングデータのレスポンス型定義 */
export interface RankingResponseType {
  status: string;
  message: string;
  data: {
    dailyRankingByCount: Ranking[];
    dailyRankingByTime: Ranking[];
    monthlyRankingByCount: Ranking[];
    monthlyRankingByTime: Ranking[];
    weeklyRankingByCount: Ranking[];
    weeklyRankingByTime: Ranking[];
    yearlyRankingByCount: Ranking[];
    yearlyRankingByTime: Ranking[];
  };
}
