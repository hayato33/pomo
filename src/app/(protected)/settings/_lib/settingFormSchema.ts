import { z } from "zod";
import { TimerBgmValue } from "@/app/_config/timerBgm";
import { TimerEndSoundValue } from "@/app/_config/timerEndSound";
import { FontValue } from "@/app/_config/font";

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
  focusTimeBgm: z.enum(TimerBgmValue),
  shortBreakBgm: z.enum(TimerBgmValue),
  longBreakBgm: z.enum(TimerBgmValue),
  focusTimeSound: z.enum(TimerEndSoundValue),
  shortBreakSound: z.enum(TimerEndSoundValue),
  longBreakSound: z.enum(TimerEndSoundValue),
  soundVolume: z.number().min(0).max(100),
  timelinePageLink: z.boolean(),
  postButtonToTimeline: z.boolean(),
  rankingPageLink: z.boolean(),
  showOnRanking: z.boolean(),
  backgroundImageKey: z.string().nullable(),
  font: z.enum(FontValue),
  hideExplainText: z.boolean(),
  setRandomTime: z.boolean(),
});
export const settingFormSchema = z.intersection(userSchema, settingSchema);
