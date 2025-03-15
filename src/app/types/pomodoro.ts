/** サーバーから取得するポモドーロログデータの型 */
export interface PomodoroLogResponse {
  id: string;
  userId: string;
  completedCount: number;
  completedTime: number;
  displayInTimeline: boolean;
  loggedAt: string;
  user: {
    nickname: string;
    profileImageKey: string | undefined;
  };
}

/** ポモドーロログ表示コンポーネントのプロパティ型 */
export interface PomodoroLogDisplayProps {
  name?: string;
  profileImageKey?: string;
  completedTime: number;
  completedCount: number;
  loggedAt: Date;
  isLoading?: boolean;
}
