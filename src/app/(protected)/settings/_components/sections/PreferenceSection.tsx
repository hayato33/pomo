import { Section } from "../Section";
import { ImageUploadSectionProps } from "../../_types/SectionProps";
import {
  FormFieldFileUpload,
  FormFieldSelect,
  FormFieldSwitch,
} from "../FormField";
import { FONT_OPTIONS } from "@/app/_config/font";

export const PreferenceSection: React.FC<ImageUploadSectionProps> = ({
  control,
  isSubmitting,
  setValue,
  getValues,
}) => {
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
        options={FONT_OPTIONS}
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="hideExplainText"
        label="タイマーページの説明テキストを非表示にする"
        subtext="「1セット◯分～」から始まる文章です。"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="setRandomTime"
        label="時間・サイクル数をランダムにする"
        subtext="1セット終わるごとにランダムな時間・サイクル数が設定されます。"
      />
    </Section>
  );
};
