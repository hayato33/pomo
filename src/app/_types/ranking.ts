/** ランキングの型 */
export interface Ranking {
  id: string;
  nickname: string | null;
  profile_image_key: string | null;
  rank: number;
}

/** 日次ランキング(カウント) */
export interface DailyRankingByCount extends Ranking {
  daily_count: number;
}

/** 日次ランキング(時間) */
export interface DailyRankingByTime extends Ranking {
  daily_time: number;
}

/** 月次ランキング(カウント) */
export interface MonthlyRankingByCount extends Ranking {
  monthly_count: number;
}

/** 月次ランキング(時間) */
export interface MonthlyRankingByTime extends Ranking {
  monthly_time: number;
}

/** 週次ランキング(カウント) */
export interface WeeklyRankingByCount extends Ranking {
  weekly_count: number;
}

/** 週次ランキング(時間) */
export interface WeeklyRankingByTime extends Ranking {
  weekly_time: number;
}

/** 年次ランキング(カウント) */
export interface YearlyRankingByCount extends Ranking {
  yearly_count: number;
}

/** 年次ランキング(時間) */
export interface YearlyRankingByTime extends Ranking {
  yearly_time: number;
}
