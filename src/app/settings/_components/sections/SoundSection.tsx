import Section from "../Section";
import SectionItem from "../SectionItem";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/elements/Select";
import { Slider } from "@/app/_components/elements/Slider";

export default function SoundSection() {
  return (
    <Section title="サウンド設定">
      <SectionItem labelText="集中時間中のBGMを変更する" id="focusTimeBgm">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="BGMを選択" />
          </SelectTrigger>
        </Select>
      </SectionItem>
      <SectionItem labelText="集中時間終了時のサウンドを変更する" id="focusTimeSound">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="サウンドを選択" />
          </SelectTrigger>
        </Select>
      </SectionItem>
      <SectionItem labelText="小休憩終了時のサウンドを変更する" id="shortBreakSound">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="サウンドを選択" />
          </SelectTrigger>
        </Select>
      </SectionItem>
      <SectionItem labelText="長休憩終了時のサウンドを変更する" id="longBreakSound">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="サウンドを選択" />
          </SelectTrigger>
        </Select>
      </SectionItem>
      <SectionItem labelText="音量を変更する" id="soundVolume">
        <Slider id="soundVolume" className="my-4" />
      </SectionItem>
    </Section>
  );
}
