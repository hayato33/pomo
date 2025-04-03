import {
  DailyRankingByCount,
  DailyRankingByTime,
  MonthlyRankingByCount,
  MonthlyRankingByTime,
  WeeklyRankingByCount,
  WeeklyRankingByTime,
  YearlyRankingByCount,
  YearlyRankingByTime,
} from "@/app/_types/ranking";

/** ランキングデータのレスポンス型定義 */
export interface RankingResponseType {
  status: string;
  message: string;
  data: {
    dailyRankingByCount: DailyRankingByCount[];
    dailyRankingByTime: DailyRankingByTime[];
    monthlyRankingByCount: MonthlyRankingByCount[];
    monthlyRankingByTime: MonthlyRankingByTime[];
    weeklyRankingByCount: WeeklyRankingByCount[];
    weeklyRankingByTime: WeeklyRankingByTime[];
    yearlyRankingByCount: YearlyRankingByCount[];
    yearlyRankingByTime: YearlyRankingByTime[];
  };
}
