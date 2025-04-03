"use client";

import PageTitle from "../../_components/elements/PageTItle";
import { useRanking } from "../../_hooks/useRanking";
import { RankingLoading } from "./_components/RankingLoading";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/Tabs";
import { RankingTabsContent } from "./_components/RankingTabsContent";
import { RankingData } from "./_types/rankingData";

export default function Page() {
  const { data: rankingData, isLoading, isError } = useRanking();
  const ranking = rankingData?.data;
  if (!ranking) return <div>ランキングデータが存在しません</div>;
  const {
    dailyRankingByCount,
    dailyRankingByTime,
    monthlyRankingByCount,
    monthlyRankingByTime,
    weeklyRankingByCount,
    weeklyRankingByTime,
    yearlyRankingByCount,
    yearlyRankingByTime,
  }: RankingData = ranking;

  if (isError) return <div>エラーが発生しました</div>;

  return (
    <div className="mx-auto max-w-[500px]">
      <PageTitle>ランキング</PageTitle>

      <div className="flex flex-col items-center justify-center gap-6">
        {isLoading && <RankingLoading />}
        {!isLoading && (
          <div className="relative w-full rounded-md border px-4 py-2">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList>
                <TabsTrigger value="daily">日</TabsTrigger>
                <TabsTrigger value="weekly">週</TabsTrigger>
                <TabsTrigger value="monthly">月</TabsTrigger>
                <TabsTrigger value="yearly">年</TabsTrigger>
              </TabsList>
              <RankingTabsContent
                period="daily"
                rankingByCount={dailyRankingByCount}
                rankingByTime={dailyRankingByTime}
              />
              <RankingTabsContent
                period="weekly"
                rankingByCount={weeklyRankingByCount}
                rankingByTime={weeklyRankingByTime}
              />
              <RankingTabsContent
                period="monthly"
                rankingByCount={monthlyRankingByCount}
                rankingByTime={monthlyRankingByTime}
              />
              <RankingTabsContent
                period="yearly"
                rankingByCount={yearlyRankingByCount}
                rankingByTime={yearlyRankingByTime}
              />
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
