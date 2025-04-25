/** ランキングの型 */
export interface Ranking {
  id: string;
  nickname: string | null;
  profile_image_key: string | null;
  rank: number;
  value: number;
}

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

/** ランキング取得APIのレスポンス型定義 */
export interface GetRankingResponse {
  status: "success";
  message: string;
  data: RankingData;
}
