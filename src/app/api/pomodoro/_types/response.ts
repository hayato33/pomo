import { PeriodicPomoData } from "@/app/_types/pomodoro";

/** ポモドーロ統計情報のレスポンス型定義 */
export interface PomodoroStatsResponseType {
  status: string;
  message: string;
  data: {
    totalCompletedCount: number;
    totalTime: number;
    totalDays: number;
    averageTimePerDay: number;
    weeklyData: PeriodicPomoData[];
    monthlyData: PeriodicPomoData[];
  };
}
