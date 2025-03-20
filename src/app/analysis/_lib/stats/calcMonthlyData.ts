import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";
import { fillEmptyDates, getMonthRange } from "./dateUtils";
import { PeriodicPomoData } from "@/app/_types/pomodoro";

/**
 * 月次の集計データを計算する
 * @param pomodoroLog - ポモドーロログ配列
 * @returns 月次の集計データ
 */
export const calcMonthlyData = (
  pomodoroLog: AnalysisPomodoroLog[]
): PeriodicPomoData => {
  const { startOfMonth, endOfMonth } = getMonthRange();
  const monthlyData: PeriodicPomoData = {};

  pomodoroLog.forEach((record) => {
    const loggedDate = record.loggedAt;
    if (loggedDate >= startOfMonth && loggedDate <= endOfMonth) {
      const dateStr = loggedDate.toISOString().slice(0, 10);
      const dailyStats = {
        totalTime: record.completedTime * record.completedCount,
        totalCount: record.completedCount,
      };

      monthlyData[dateStr] = monthlyData[dateStr]
        ? {
            totalTime: monthlyData[dateStr].totalTime + dailyStats.totalTime,
            totalCount: monthlyData[dateStr].totalCount + dailyStats.totalCount,
          }
        : dailyStats;
    }
  });

  fillEmptyDates(startOfMonth, endOfMonth, monthlyData);
  return monthlyData;
};
