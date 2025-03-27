import Section from "../Section";
import SectionItem from "../SectionItem";
import { Switch } from "@/app/_components/elements/Switch";

export default function TimerSection() {
  return (
    <Section title="タイマー設定">
      <SectionItem
        labelText="集中時間⇒小休憩を自動で開始する"
        id="autoStartShortBreak"
      >
        <Switch id="autoStartShortBreak" />
      </SectionItem>
      <SectionItem
        labelText="小休憩⇒集中時間を自動で開始する"
        id="autoStartFocusTime"
      >
        <Switch id="autoStartFocusTime" />
      </SectionItem>
      <SectionItem
        labelText="小休憩⇒長休憩を自動で開始する"
        id="autoStartLongBreak"
      >
        <Switch id="autoStartLongBreak" />
      </SectionItem>
    </Section>
  );
}
