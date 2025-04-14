import { useSetting } from "@/app/_hooks/useSetting";
import { TimerSettings } from "@/app/_config/timerConfig";
/* タイマーの説明テキスト */
export default function ExplainText({
  storedSettings,
}: {
  storedSettings: TimerSettings;
}) {
  const { data: setting } = useSetting();
  const hideExplainText = setting?.data?.hideExplainText;

  if (hideExplainText) return null;
  const { focusTime, shortBreakTime, cycles, longBreakTime } = storedSettings;
  const total = (focusTime + shortBreakTime) * cycles + longBreakTime;

  return (
    <p className="text-center">
      1セット{total}分 = (集中時間{focusTime}分 + 小休憩{shortBreakTime}分) ×
      サイクル{cycles}回 + 長休憩{longBreakTime}分
    </p>
  );
}
