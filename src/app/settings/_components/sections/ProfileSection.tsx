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

export default function ProfileSection({
  control,
  isSubmitting,
}: SectionProps) {
  return (
    <Section title="プロフィール設定">
      <FormField
        control={control}
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
              <FormLabel className="min-w-36 font-normal">
                ニックネームを変更する
              </FormLabel>
              <FormControl className="flex-1">
                <Input
                  className="!mt-0"
                  disabled={isSubmitting}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
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
