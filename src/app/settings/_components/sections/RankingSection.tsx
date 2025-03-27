import Section from "../Section";
import SectionItem from "../SectionItem";
import { Switch } from "@/app/_components/elements/Switch";

export default function RankingSection() {
  return (
    <Section title="ランキング設定">
      <SectionItem
        labelText="ヘッダーメニューにランキングページへのリンクを表示する"
        id="rankingPageLink"
      >
        <Switch id="rankingPageLink" />
      </SectionItem>
      <SectionItem
        labelText="ランキングに自分の記録を公開する"
        id="showOnRanking"
      >
        <Switch id="showOnRanking" />
      </SectionItem>
    </Section>
  );
}
