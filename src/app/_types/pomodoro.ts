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

/** 期間ごとのポモドーロデータの型定義 */
export interface PeriodicPomoData {
  date: string;
  time: number;
  count: number;
}
