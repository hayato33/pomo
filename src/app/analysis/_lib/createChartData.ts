import { PeriodicPomoData } from "@/app/_types/pomodoro";

/**
 * ポモドーロデータをチャート表示用データ（日付と時間）に変換する
 * @param data - 期間ごとのポモドーロデータ
 * @returns 日付と時間の配列
 */
export const createTimeChartData = (
  data: PeriodicPomoData
): {
  date: string;
  time: number;
}[] => {
  return Object.entries(data)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("ja-JP"),
      time: data.totalTime,
    }));
};

/**
 * ポモドーロデータをチャート表示用データ（日付とカウント数）に変換する
 * @param data - 期間ごとのポモドーロデータ
 * @returns 日付とカウント数の配列
 */
export const createCountChartData = (
  data: PeriodicPomoData
): {
  date: string;
  count: number;
}[] => {
  return Object.entries(data)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("ja-JP"),
      count: data.totalCount,
    }));
};
