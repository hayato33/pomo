/** 分単位の時間をX時間XX分形式に変換する関数 */
export const minutesToHours = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}時間${m}分`;
};
