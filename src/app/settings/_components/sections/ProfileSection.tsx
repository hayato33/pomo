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
import FormFieldInput from "../FormFieldInput";

export default function ProfileSection({
  control,
  isSubmitting,
}: SectionProps) {
  return (
    <Section title="プロフィール設定">
      <FormFieldInput
        control={control}
        isSubmitting={isSubmitting}
        name="nickname"
        label="ニックネームを変更する"
      />
      <FormField
        control={control}
        name="profileImageKey"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
              <FormLabel className="min-w-36 font-normal">
                プロフィール画像を変更する
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
    </Section>
  );
}
