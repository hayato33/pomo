import { PeriodicPomoData } from "@/app/_types/pomodoro";

/**
 * 日付範囲内の全ての日を埋める
 * @param start - 開始日
 * @param end - 終了日
 * @param aggregates - 集計データ
 */
export const fillEmptyDates = (
  start: Date,
  end: Date,
  aggregates: PeriodicPomoData
): void => {
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    if (!aggregates[dateStr])
      aggregates[dateStr] = { totalTime: 0, totalCount: 0 };
  }
};

/**
 * 現在の週の開始日と終了日を計算する
 * @returns 週の開始日と終了日
 */
export const getWeekRange = (): { startOfWeek: Date; endOfWeek: Date } => {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();

  const startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - dayOfWeek);
  startOfWeek.setUTCHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  endOfWeek.setUTCHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};

/**
 * 現在の月の開始日と終了日を計算する
 * @returns 月の開始日と終了日
 */
export const getMonthRange = (): { startOfMonth: Date; endOfMonth: Date } => {
  const now = new Date();

  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  );

  const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
  );
  endOfMonth.setUTCHours(23, 59, 59, 999);

  return { startOfMonth, endOfMonth };
};
