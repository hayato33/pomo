import Section from "../Section";
import { SectionProps } from "../../_types/SectionProps";
import { FormFieldSwitch } from "../FormField";

export default function TimelineSection({
  control,
  isSubmitting,
}: SectionProps) {
  return (
    <Section title="タイムライン設定">
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="timelinePageLink"
        label="メニューにタイムラインページへのリンクを表示する"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="postButtonToTimeline"
        label="タイマー終了時に投稿画面を表示する"
        subtext="記録は保存されます(分析ページにて確認可能)"
      />
    </Section>
  );
}
