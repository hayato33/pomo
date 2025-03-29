import Section from "../Section";
import { SectionProps } from "../../_types/SectionProps";
import { FormFieldSelect, FormFieldSlider } from "../FormField";

export default function SoundSection({ control, isSubmitting }: SectionProps) {
  return (
    <Section title="サウンド設定">
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="focusTimeBgm"
        label="集中時間中のBGMを変更する"
        options={[
          { value: "noBgm", label: "BGMなし" },
          { value: "bgm1", label: "BGM1" },
          { value: "bgm2", label: "BGM2" },
        ]}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="focusTimeSound"
        label="集中時間終了時のサウンドを変更する"
        options={[
          { value: "noSound", label: "サウンドなし" },
          { value: "sound1", label: "サウンド1" },
          { value: "sound2", label: "サウンド2" },
        ]}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="shortBreakSound"
        label="小休憩終了時のサウンドを変更する"
        options={[
          { value: "noSound", label: "サウンドなし" },
          { value: "sound1", label: "サウンド1" },
          { value: "sound2", label: "サウンド2" },
        ]}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="longBreakSound"
        label="長休憩終了時のサウンドを変更する"
        options={[
          { value: "noSound", label: "サウンドなし" },
          { value: "sound1", label: "サウンド1" },
          { value: "sound2", label: "サウンド2" },
        ]}
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
