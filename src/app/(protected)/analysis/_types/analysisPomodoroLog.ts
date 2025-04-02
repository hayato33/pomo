/** 分析ページ用のポモドーロログの型 */
export default interface AnalysisPomodoroLog {
  loggedAt: Date;
  completedTime: number;
  completedCount: number;
}
