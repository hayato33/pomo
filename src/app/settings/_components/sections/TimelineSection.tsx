import Section from "../Section";
import { SectionProps } from "../../_types/SectionProps";
import FormFieldSwitch from "../FormFieldSwitch";

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
        label="ヘッダーメニューにタイムラインページへのリンクを表示する"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="postButtonToTimeline"
        label="ポモドーロ終了時画面にタイムラインへの投稿ボタンを表示する"
      />
    </Section>
  );
}
