import { UpdateUserSetting } from "../_types/setting";

/** ユーザー設定のデフォルト値 */
export const DEFAULT_USER_SETTINGS: UpdateUserSetting = {
  autoStartShortBreak: false,
  autoStartFocusTime: false,
  autoStartLongBreak: false,
  focusTimeBgm: "noBgm",
  shortBreakBgm: "noBgm",
  longBreakBgm: "noBgm",
  focusTimeSound: "noSound",
  shortBreakSound: "noSound",
  longBreakSound: "noSound",
  soundVolume: 50,
  timelinePageLink: true,
  postButtonToTimeline: true,
  rankingPageLink: true,
  showOnRanking: true,
  backgroundImageKey: null,
  font: "mPlus1",
  hideExplainText: false,
  setRandomTime: false,
};
