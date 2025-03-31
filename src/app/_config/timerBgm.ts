/**
 * 集中時間中BGM（以下は仮の設定）
 * デフォルトはBGMなし
 * TODO: 実際にBGMを設定する
 */
export const TIMER_BGM_OPTIONS = [
  { value: "noBgm", label: "BGMなし" },
  { value: "bgm1", label: "BGM1" },
  { value: "bgm2", label: "BGM2" },
];

/**集中時間中BGMの型 */
export type TimerBgmValue = "noBgm" | "bgm1" | "bgm2";
