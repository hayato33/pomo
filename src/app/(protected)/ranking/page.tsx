"use client";

import PageTitle from "../../_components/elements/PageTitle";
import { useRanking } from "../../_hooks/useRanking";
import { RankingLoading } from "./_components/RankingLoading";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/Tabs";
import { RankingTable } from "./_components/RankingTable";
import { RankingData } from "./_types/rankingData";
import { useState } from "react";

/** ランキングページ */
export default function Page() {
  const [valueType, setValueType] = useState<"count" | "time">("count");

  const { data: rankingData, isLoading, isError } = useRanking();

  // ユーザー数がある程度つくまでランキング非表示
  if (true) {
    return (
      <div className="mx-auto max-w-[500px]">
        <PageTitle>ランキング</PageTitle>
        <p>
          ランキング機能は現在準備中です。
          <br />
          今しばらくお待ちください！
        </p>
      </div>
    );
  }

  // 早期リターン
  if (isError) return <div>エラーが発生しました</div>;

  const ranking = rankingData?.data;
  const {
    dailyRankingByCount,
    dailyRankingByTime,
    monthlyRankingByCount,
    monthlyRankingByTime,
    weeklyRankingByCount,
    weeklyRankingByTime,
    yearlyRankingByCount,
    yearlyRankingByTime,
  }: RankingData = ranking ?? {};

  return (
    <div className="mx-auto max-w-[500px]">
      <PageTitle>ランキング</PageTitle>

      <div className="flex flex-col items-center justify-center gap-6">
        {isLoading && <RankingLoading />}
        {!isLoading && ranking && (
          <div className="relative w-full rounded-md border px-4 py-2">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList>
                <TabsTrigger value="daily">日</TabsTrigger>
                <TabsTrigger value="weekly">週</TabsTrigger>
                <TabsTrigger value="monthly">月</TabsTrigger>
                <TabsTrigger value="yearly">年</TabsTrigger>
              </TabsList>
              <div className="absolute right-4 top-2 z-10">
                <Tabs
                  value={valueType}
                  onValueChange={(value) =>
                    setValueType(value as "count" | "time")
                  }
                >
                  <TabsList>
                    <TabsTrigger value="count">回数</TabsTrigger>
                    <TabsTrigger value="time">時間</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* 日次ランキング */}
              <TabsContent value="daily">
                {valueType === "count" ? (
                  <RankingTable data={dailyRankingByCount} dataType="count" />
                ) : (
                  <RankingTable data={dailyRankingByTime} dataType="time" />
                )}
              </TabsContent>

              {/* 週次ランキング */}
              <TabsContent value="weekly">
                {valueType === "count" ? (
                  <RankingTable data={weeklyRankingByCount} dataType="count" />
                ) : (
                  <RankingTable data={weeklyRankingByTime} dataType="time" />
                )}
              </TabsContent>

              {/* 月次ランキング */}
              <TabsContent value="monthly">
                {valueType === "count" ? (
                  <RankingTable data={monthlyRankingByCount} dataType="count" />
                ) : (
                  <RankingTable data={monthlyRankingByTime} dataType="time" />
                )}
              </TabsContent>

              {/* 年次ランキング */}
              <TabsContent value="yearly">
                {valueType === "count" ? (
                  <RankingTable data={yearlyRankingByCount} dataType="count" />
                ) : (
                  <RankingTable data={yearlyRankingByTime} dataType="time" />
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
        {!isLoading && !ranking && <div>ランキングデータが存在しません</div>}
      </div>
    </div>
  );
}
