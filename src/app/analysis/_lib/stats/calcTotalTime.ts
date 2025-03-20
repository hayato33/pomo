import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";

/**
 * 総集中時間を計算する
 * @param pomodoroLog - ポモドーロログ配列
 * @returns 総集中時間（分）
 */
export const calcTotalTime = (pomodoroLog: AnalysisPomodoroLog[]): number =>
  pomodoroLog.reduce(
    (sum, record) => sum + record.completedTime * record.completedCount,
    0
  );
