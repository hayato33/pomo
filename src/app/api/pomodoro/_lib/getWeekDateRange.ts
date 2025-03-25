import { toISOStringWithTimezone } from "./toISOStringWithTimezone";

/**
 * 週の日付範囲（日曜日から土曜日まで）を計算
 * @param weekOffset - 現在の週からのオフセット（0=今週、-1=先週、1=来週）
 * @returns - 開始日と終了日のオブジェクト（YYYY-MM-DD形式）
 */
export function getWeekDateRange(weekOffset = 0): {
  startDate: string;
  endDate: string;
} {
  const now = new Date();
  const currentDay = now.getDay(); // 0が日曜、1が月曜...

  // 現在の週の日曜日を計算
  const sundayDate = new Date(now);
  sundayDate.setDate(now.getDate() - currentDay + weekOffset * 7);

  // 土曜日を計算（日曜日+6日）
  const saturdayDate = new Date(sundayDate);
  saturdayDate.setDate(sundayDate.getDate() + 6);

  // YYYY-MM-DD形式に変換
  return {
    startDate: toISOStringWithTimezone(sundayDate),
    endDate: toISOStringWithTimezone(saturdayDate),
  };
}
