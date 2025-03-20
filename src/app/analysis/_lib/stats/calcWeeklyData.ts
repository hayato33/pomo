import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";
import { fillEmptyDates, getWeekRange } from "./dateUtils";
import { PeriodicPomoData } from "@/app/_types/pomodoro";

/**
 * 週次の集計データを計算する
 * @param pomodoroLog - ポモドーロログ配列
 * @returns 週次の集計データ
 */
export const calcWeeklyData = (
  pomodoroLog: AnalysisPomodoroLog[]
): PeriodicPomoData => {
  const { startOfWeek, endOfWeek } = getWeekRange();
  const weeklyData: PeriodicPomoData = {};

  pomodoroLog.forEach((record) => {
    const loggedDate = record.loggedAt;
    if (loggedDate >= startOfWeek && loggedDate <= endOfWeek) {
      const dateStr = loggedDate.toISOString().slice(0, 10);
      const dailyStats = {
        totalTime: record.completedTime * record.completedCount,
        totalCount: record.completedCount,
      };

      weeklyData[dateStr] = weeklyData[dateStr]
        ? {
            totalTime: weeklyData[dateStr].totalTime + dailyStats.totalTime,
            totalCount: weeklyData[dateStr].totalCount + dailyStats.totalCount,
          }
        : dailyStats;
    }
  });

  fillEmptyDates(startOfWeek, endOfWeek, weeklyData);
  return weeklyData;
};
