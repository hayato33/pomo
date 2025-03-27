import Section from "../Section";
import SectionItem from "../SectionItem";
import { Switch } from "@/app/_components/elements/Switch";

export default function TimelineSection() {
  return (
    <Section title="タイムライン設定">
      <SectionItem
        labelText="ヘッダーメニューにタイムラインページへのリンクを表示する"
        id="timelinePageLink"
      >
        <Switch id="timelinePageLink" />
      </SectionItem>
      <SectionItem
        labelText="ポモドーロ終了時画面にタイムラインへの投稿ボタンを表示する"
        id="postButtonToTimeline"
      >
        <Switch id="postButtonToTimeline" />
      </SectionItem>
    </Section>
  );
}
