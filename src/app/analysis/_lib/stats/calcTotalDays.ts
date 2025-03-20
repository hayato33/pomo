import AnalysisPomodoroLog from "@/app/analysis/_types/analysisPomodoroLog";

/**
 * 総ポモドーロ計測日数を計算する
 * @param pomodoroLog - ポモドーロログ配列
 * @returns 総ポモドーロ計測日数
 */
export const calcTotalDays = (pomodoroLog: AnalysisPomodoroLog[]): number => {
  // loggedAtから日付部分 (YYYY-MM-DD) だけを取得し、重複を排除する
  const uniqueDays = new Set(
    pomodoroLog.map((record) => record.loggedAt.toISOString().slice(0, 10))
  );
  return uniqueDays.size;
};
