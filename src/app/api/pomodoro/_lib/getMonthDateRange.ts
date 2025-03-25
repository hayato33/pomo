import { toISOStringWithTimezone } from "./toISOStringWithTimezone";

/**
 * 月の日付範囲（月初から月末まで）を計算
 * @param monthOffset - 現在の月からのオフセット（0=今月、-1=先月、1=来月）
 * @returns - 開始日と終了日のオブジェクト（YYYY-MM-DD形式）
 */
export function getMonthDateRange(monthOffset = 0): {
  startDate: string;
  endDate: string;
} {
  const now = new Date();

  // 指定月の月初を計算
  const firstDay = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);

  // 指定月の月末を計算（翌月の0日=当月末日）
  const lastDay = new Date(
    now.getFullYear(),
    now.getMonth() + monthOffset + 1,
    0
  );

  // YYYY-MM-DD形式に変換
  return {
    startDate: toISOStringWithTimezone(firstDay),
    endDate: toISOStringWithTimezone(lastDay),
  };
}
