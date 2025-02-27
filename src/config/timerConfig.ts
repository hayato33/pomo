/** LocalStorage用のキー */
export const TIMER_SETTINGS_KEY = "pomoTimerSettings";

/** タイマー設定の型定義 */
export interface TimerSettings {
  /** 集中時間（分） */
  focusTime: number;
  /** 短い休憩時間（分） */
  shortBreakTime: number;
  /** 長い休憩時間（分） */
  longBreakTime: number;
  /** ポモドーロサイクル数 */
  cycles: number;
}

/** デフォルトのタイマー設定値 */
export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 30,
  cycles: 4,
};
