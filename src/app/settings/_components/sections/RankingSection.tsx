import Section from "../Section";
import { SectionProps } from "../../_types/SectionProps";
import { FormFieldSwitch } from "../FormField";

export default function RankingSection({
  control,
  isSubmitting,
}: SectionProps) {
  return (
    <Section title="ランキング設定">
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="rankingPageLink"
        label="ヘッダーメニューにランキングページへのリンクを表示する"
      />
      <FormFieldSwitch
        control={control}
        isSubmitting={isSubmitting}
        name="showOnRanking"
        label="ランキングに自分の記録を公開する"
      />
    </Section>
  );
}
