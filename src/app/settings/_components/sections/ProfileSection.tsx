import { Input } from "@/app/_components/elements/Input";
import Section from "../Section";
import SectionItem from "../SectionItem";

export default function ProfileSection() {
  return (
    <Section title="プロフィール設定">
      <SectionItem labelText="ニックネームを変更する" id="nickname">
        <Input id="nickname" />
      </SectionItem>
      <SectionItem labelText="プロフィール画像を変更する" id="profileImageKey">
        <Input
          id="profileImageKey"
          type="file"
          placeholder="File"
          accept="image/*"
        />
      </SectionItem>
    </Section>
  );
}
