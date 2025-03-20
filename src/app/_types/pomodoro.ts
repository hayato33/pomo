/** ポモドーロログデータの型 */
export interface PomodoroLogType {
  id?: string;
  userId?: string;
  completedCount: number;
  completedTime: number;
  loggedAt: Date;
  displayInTimeline?: boolean;
  user: {
    nickname: string;
    profileImageKey: string | null;
  };
}

/** 期間（週・月）ごとのポモドーロログデータの型定義 */
export type PeriodicPomoData = Record<
  string,
  {
    totalTime: number;
    totalCount: number;
  }
>;
