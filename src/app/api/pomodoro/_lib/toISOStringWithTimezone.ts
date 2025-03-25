/**
 * 日付をYYYY-MM-DD形式の文字列に変換(タイムゾーン考慮)
 * @param date - 変換する日付
 * @returns - YYYY-MM-DD形式の文字列
 */
export function toISOStringWithTimezone(date: Date): string {
  const pad = (str: string) => ("0" + str).slice(-2);
  const year = date.getFullYear().toString();
  const month = pad((date.getMonth() + 1).toString());
  const day = pad(date.getDate().toString());
  return `${year}-${month}-${day}`;
}
