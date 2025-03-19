/** 分析ページ用のポモドーロログの型 */
export default interface AnalysisPomodoroLog {
  loggedAt: string;
  completedTime: number;
  completedCount: number;
}
