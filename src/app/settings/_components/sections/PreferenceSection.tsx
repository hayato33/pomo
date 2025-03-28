import { Input } from "@/app/_components/elements/Input";
import Section from "../Section";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { SectionProps } from "../../_types/SectionProps";
import FormFieldSwitch from "../FormFieldSwitch";
import FormFieldSelect from "../FormFieldSelect";

export default function PreferenceSection({
  control,
  isSubmitting,
}: SectionProps) {
  return (
    <Section title="こだわり設定" className="border-none">
      <FormField
        control={control}
        name="backgroundImageKey"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
              <FormLabel className="min-w-36 font-normal">
                ポモドーロタイマーページの背景を変更する
              </FormLabel>
              <FormControl className="flex-1">
                <Input
                  className="!mt-0"
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  onChange={field.onChange}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
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
        label="ポモドーロタイマーページ内の説明テキストを非表示にする"
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
