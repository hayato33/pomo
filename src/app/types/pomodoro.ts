/** ポモドーロログデータの型 */
export default interface PomodoroLogType {
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
