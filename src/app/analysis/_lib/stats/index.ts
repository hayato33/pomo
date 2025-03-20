import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";
import { calcTotalCompletedCount } from "./calcTotalCompletedCount";
import { calcTotalTime } from "./calcTotalTime";
import { calcTotalDays } from "./calcTotalDays";
import { calcAverageTime } from "./calcAverageTime";
import { calcWeeklyData } from "./calcWeeklyData";
import { calcMonthlyData } from "./calcMonthlyData";

/**
 * ポモドーロログの統計情報を計算する関数
 * @param pomodoroLog - 集計対象のポモドーロログ配列
 * @returns 統計情報（総ポモドーロ回数、総集中時間、総計測日数、平均集中時間、週次集計、月次集計）
 */
export const calcPomoStats = (pomodoroLog: AnalysisPomodoroLog[]) => {
  return {
    totalCompletedCount: calcTotalCompletedCount(pomodoroLog),
    totalTime: calcTotalTime(pomodoroLog),
    totalDays: calcTotalDays(pomodoroLog),
    average: calcAverageTime(pomodoroLog),
    weeklyData: calcWeeklyData(pomodoroLog),
    monthlyData: calcMonthlyData(pomodoroLog),
  };
};
