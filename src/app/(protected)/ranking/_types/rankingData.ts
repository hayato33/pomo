import { Ranking } from "@/app/_types/ranking";

export interface RankingData {
  dailyRankingByCount: Ranking[];
  dailyRankingByTime: Ranking[];
  monthlyRankingByCount: Ranking[];
  monthlyRankingByTime: Ranking[];
  weeklyRankingByCount: Ranking[];
  weeklyRankingByTime: Ranking[];
  yearlyRankingByCount: Ranking[];
  yearlyRankingByTime: Ranking[];
}
