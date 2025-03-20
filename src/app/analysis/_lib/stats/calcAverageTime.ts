import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";
import { calcTotalTime } from "./calcTotalTime";
import { calcTotalDays } from "./calcTotalDays";

/**
 * 平均集中時間を計算する
 * @param pomodoroLog - ポモドーロログ配列
 * @returns 記録日数に対する平均集中時間
 */
export const calcAverageTime = (pomodoroLog: AnalysisPomodoroLog[]): number => {
  const totalTime = calcTotalTime(pomodoroLog);
  const totalDays = calcTotalDays(pomodoroLog);

  return totalDays > 0 ? totalTime / totalDays : 0;
};
