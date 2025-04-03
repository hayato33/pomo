import { Ranking } from "@/app/_types/ranking";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/Tabs";
import { RankingTable } from "./RankingTable";

interface Props {
  period: "daily" | "weekly" | "monthly" | "yearly";
  rankingByCount: Ranking[];
  rankingByTime: Ranking[];
}

export const RankingTabsContent = ({
  period,
  rankingByCount,
  rankingByTime,
}: Props) => {
  return (
    <TabsContent value={period}>
      <Tabs defaultValue={`${period}-count`}>
        <TabsList>
          <TabsTrigger value={`${period}-count`}>回数</TabsTrigger>
          <TabsTrigger value={`${period}-time`}>時間</TabsTrigger>
        </TabsList>
        <TabsContent value={`${period}-count`}>
          <RankingTable data={rankingByCount} dataType="count" />
        </TabsContent>
        <TabsContent value={`${period}-time`}>
          <RankingTable data={rankingByTime} dataType="time" />
        </TabsContent>
      </Tabs>
    </TabsContent>
  );
};
