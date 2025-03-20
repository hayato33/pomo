import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";

/**
 * 総ポモドーロ回数を計算する
 * @param pomodoroLog - ポモドーロログ配列
 * @returns 総ポモドーロ回数
 */
export const calcTotalCompletedCount = (
  pomodoroLog: AnalysisPomodoroLog[]
): number =>
  pomodoroLog.reduce((sum, record) => sum + record.completedCount, 0);
