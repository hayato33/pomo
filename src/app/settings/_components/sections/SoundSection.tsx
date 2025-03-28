import Section from "../Section";
import { Slider } from "@/app/_components/elements/Slider";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { SectionProps } from "../../_types/SectionProps";
import FormFieldSelect from "../FormFieldSelect";

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

      <FormField
        control={control}
        name="soundVolume"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
              <FormLabel className="min-w-36 font-normal">
                音量を変更する
              </FormLabel>
              <FormControl className="flex-1">
                <Slider
                  // className="my-4"
                  disabled={isSubmitting}
                  value={[field.value]}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
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
