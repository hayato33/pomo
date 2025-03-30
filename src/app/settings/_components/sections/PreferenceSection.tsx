import Section from "../Section";
import { ImageUploadSectionProps } from "../../_types/SectionProps";
import {
  FormFieldFileUpload,
  FormFieldSelect,
  FormFieldSwitch,
} from "../FormField";

export default function PreferenceSection({
  control,
  isSubmitting,
  setValue,
  getValues,
}: ImageUploadSectionProps) {
  return (
    <Section title="こだわり設定" className="border-none">
      <FormFieldFileUpload
        control={control}
        isSubmitting={isSubmitting}
        name="backgroundImageKey"
        label="ポモドーロタイマーページの背景を変更する"
        altText="ポモドーロタイマーページの背景画像"
        setValue={setValue}
        getValues={getValues}
      />
      <FormFieldSelect
        control={control}
        isSubmitting={isSubmitting}
        name="font"
        label="フォントを変更する"
        options={[
          { value: "font01", label: "フォント1" },
          { value: "font02", label: "フォント2" },
          { value: "font03", label: "フォント3" },
        ]}
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="hideExplainText"
        label="タイマーページの説明テキストを非表示にする"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="setRandomTime"
        label="集中時間・小休憩・長休憩の時間をランダムにする"
      />
    </Section>
  );
}
