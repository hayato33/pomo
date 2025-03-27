import PageTitle from "../_components/elements/PageTItle";
import ProfileSection from "./_components/sections/ProfileSection";
import TimerSection from "./_components/sections/TimerSection";
import SoundSection from "./_components/sections/SoundSection";
import TimelineSection from "./_components/sections/TimelineSection";
import RankingSection from "./_components/sections/RankingSection";
import PreferenceSection from "./_components/sections/PreferenceSection";
import ActionButtons from "./_components/ActionButtons";

export default function Page() {
  return (
    <div className="mx-auto max-w-[400px]">
      <PageTitle>各種設定</PageTitle>
      <ProfileSection />
      <TimerSection />
      <SoundSection />
      <TimelineSection />
      <RankingSection />
      <PreferenceSection />
      <ActionButtons />
    </div>
  );
}
