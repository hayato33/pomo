import { Section } from "../Section";
import { SectionProps } from "../../_types/SectionProps";
import { FormFieldSwitch } from "../FormField";

export const TimerSection: React.FC<SectionProps> = ({
  control,
  isSubmitting,
}) => {
  return (
    <Section title="タイマー設定">
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="autoStartShortBreak"
        label="集中時間⇒小休憩を自動で開始する"
        subtext="オンにするとフェーズ終了時のサウンドは鳴りません。"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="autoStartFocusTime"
        label="小休憩⇒集中時間を自動で開始する"
        subtext="オンにするとフェーズ終了時のサウンドは鳴りません。"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="autoStartLongBreak"
        label="小休憩⇒長休憩を自動で開始する"
        subtext="オンにするとフェーズ終了時のサウンドは鳴りません。"
      />
    </Section>
  );
};
