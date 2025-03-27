import { Input } from "@/app/_components/elements/Input";
import Section from "../Section";
import SectionItem from "../SectionItem";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/elements/Select";
import { Switch } from "@/app/_components/elements/Switch";

export default function PreferenceSection() {
  return (
    <Section title="こだわり設定" className="border-none">
      <SectionItem
        labelText="ポモドーロタイマーページの背景を変更する"
        id="backgroundImageKey"
      >
        <Input
          id="backgroundImageKey"
          type="file"
          placeholder="File"
          accept="image/*"
        />
      </SectionItem>
      <SectionItem labelText="フォントを変更する" id="font">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="フォントを選択" />
          </SelectTrigger>
        </Select>
      </SectionItem>
      <SectionItem
        labelText="ポモドーロタイマーページ内の説明テキストを非表示にする"
        id="hideExplainText"
      >
        <Switch id="hideExplainText" />
      </SectionItem>
      <SectionItem
        labelText="集中時間・小休憩・長休憩の時間をランダムにする"
        id="setRandomTime"
      >
        <Switch id="setRandomTime" />
      </SectionItem>
    </Section>
  );
}
