import { z } from "zod";

export const userSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, "ニックネームを入力してください")
    .max(100, "ニックネームは100文字以内で入力してください"),
  profileImageKey: z.string().nullable(),
});
export const settingSchema = z.object({
  autoStartShortBreak: z.boolean(),
  autoStartFocusTime: z.boolean(),
  autoStartLongBreak: z.boolean(),
  focusTimeBgm: z.string(),
  focusTimeSound: z.string(),
  shortBreakSound: z.string(),
  longBreakSound: z.string(),
  soundVolume: z.number().min(0).max(100),
  timelinePageLink: z.boolean(),
  postButtonToTimeline: z.boolean(),
  rankingPageLink: z.boolean(),
  showOnRanking: z.boolean(),
  backgroundImageKey: z.string().nullable(),
  font: z.string(),
  hideExplainText: z.boolean(),
  setRandomTime: z.boolean(),
});
export const settingFormSchema = z.intersection(userSchema, settingSchema);
