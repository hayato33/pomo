import { PeriodicPomoData } from "@/app/_types/pomodoro";
import { CategoryStats } from "@/app/api/pomodoro/_types/categoryStats";

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
    dailyTotalTimeByCategory: CategoryStats[];
    weeklyTotalTimeByCategory: CategoryStats[];
    monthlyTotalTimeByCategory: CategoryStats[];
    yearlyTotalTimeByCategory: CategoryStats[];
  };
}
