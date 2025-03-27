import { prisma } from "@/app/_lib/prisma";
import { UpdateUserSetting } from "@/app/_types/setting";

interface Props {
  userId: string;
  body: UpdateUserSetting;
}

export async function updateSetting({ userId, body }: Props) {
  const {
    autoStartShortBreak,
    autoStartFocusTime,
    autoStartLongBreak,
    focusTimeSound,
    shortBreakSound,
    longBreakSound,
    soundVolume,
    timelinePageLink,
    postButtonToTimeline,
    rankingPageLink,
    showOnRanking,
    backgroundImageKey,
    font,
    hideExplainText,
    setRandomTime,
  } = body;
  return await prisma.userSetting.update({
    where: { userId },
    data: {
      autoStartShortBreak,
      autoStartFocusTime,
      autoStartLongBreak,
      focusTimeSound,
      shortBreakSound,
      longBreakSound,
      soundVolume,
      timelinePageLink,
      postButtonToTimeline,
      rankingPageLink,
      showOnRanking,
      backgroundImageKey,
      font,
      hideExplainText,
      setRandomTime,
    },
  });
}
