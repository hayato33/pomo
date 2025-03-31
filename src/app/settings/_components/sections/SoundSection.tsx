import Section from "../Section";
import { SectionProps } from "../../_types/SectionProps";
import { FormFieldSelect, FormFieldSlider } from "../FormField";
import { TIMER_BGM_OPTIONS } from "@/app/_config/timerBgm";
import { TIMER_END_SOUND_OPTIONS } from "@/app/_config/timerEndSound";

export default function SoundSection({ control, isSubmitting }: SectionProps) {
  return (
    <Section title="サウンド設定">
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="focusTimeBgm"
        label="集中時間中のBGMを変更する"
        options={TIMER_BGM_OPTIONS}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="focusTimeSound"
        label="集中時間終了時のサウンドを変更する"
        options={TIMER_END_SOUND_OPTIONS}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="shortBreakSound"
        label="小休憩終了時のサウンドを変更する"
        options={TIMER_END_SOUND_OPTIONS}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="longBreakSound"
        label="長休憩終了時のサウンドを変更する"
        options={TIMER_END_SOUND_OPTIONS}
      />
      <FormFieldSlider
        control={control}
        isSubmitting={isSubmitting}
        name="soundVolume"
        label="音量を変更する"
      />
    </Section>
  );
}
