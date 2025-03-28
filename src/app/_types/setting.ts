/** ユーザー設定の型(更新用) */
export interface UpdateUserSetting {
  autoStartShortBreak: boolean;
  autoStartFocusTime: boolean;
  autoStartLongBreak: boolean;
  focusTimeBgm: string;
  focusTimeSound: string;
  shortBreakSound: string;
  longBreakSound: string;
  soundVolume: number;
  timelinePageLink: boolean;
  postButtonToTimeline: boolean;
  rankingPageLink: boolean;
  showOnRanking: boolean;
  backgroundImageKey: string | null;
  font: string;
  hideExplainText: boolean;
  setRandomTime: boolean;
}
