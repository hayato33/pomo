import { prisma } from "@/app/_lib/prisma";
import { UpdateUserSetting } from "@/app/_types/setting";

interface Props {
  userId: string;
  body: UpdateUserSetting;
}

export class SettingService {
  /** ユーザー設定を更新 */
  static async update({ userId, body }: Props) {
    return await prisma.userSetting.update({
      where: { userId },
      data: {
        autoStartShortBreak: body.autoStartShortBreak,
        autoStartFocusTime: body.autoStartFocusTime,
        autoStartLongBreak: body.autoStartLongBreak,
        focusTimeBgm: body.focusTimeBgm,
        shortBreakBgm: body.shortBreakBgm,
        longBreakBgm: body.longBreakBgm,
        focusTimeSound: body.focusTimeSound,
        shortBreakSound: body.shortBreakSound,
        longBreakSound: body.longBreakSound,
        soundVolume: body.soundVolume,
        timelinePageLink: body.timelinePageLink,
        postButtonToTimeline: body.postButtonToTimeline,
        rankingPageLink: body.rankingPageLink,
        showOnRanking: body.showOnRanking,
        backgroundImageKey: body.backgroundImageKey,
        font: body.font,
        hideExplainText: body.hideExplainText,
        setRandomTime: body.setRandomTime,
      },
    });
  }
}
