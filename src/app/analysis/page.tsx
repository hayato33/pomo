"use client";

import { useCurrentUserPomodoro } from "./_hooks/useCurrentUserPomodoro";
import PageTitle from "../_components/elements/PageTItle";
import StatCard from "./_components/StatCard";
import AnalysisLoading from "./_components/AnalysisLoading";
import { minutesToHours } from "./_utils/minutesToHours";
import Record from "./_components/Record";

/** ポモドーロの分析ページ */
export default function Page() {
  const { data, isLoading, isError } = useCurrentUserPomodoro();

  if (isError) return <div>エラーが発生しました</div>;

  return (
    <div className="mx-auto max-w-[1000px]">
      <PageTitle>分析</PageTitle>
      {isLoading && <AnalysisLoading />}
      {!isLoading && data && (
        <>
          <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <StatCard
              title="総ポモ数"
              text="これまでの総ポモドーロ回数"
              value={`${data.totalCompletedCount}回`}
            />
            <StatCard
              title="総ポモ時間"
              text="これまでの総集中時間"
              value={minutesToHours(data.totalTime)}
            />
            <StatCard
              title="総ポモ日数"
              text="これまでの総ポモドーロ計測日数"
              value={`${data.totalDays}日`}
            />
            <StatCard
              title="平均ポモ時間"
              text="1日あたりの平均集中時間"
              value={minutesToHours(data.average)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <Record
              weeklyData={data.weeklyData}
              monthlyData={data.monthlyData}
            />
            {/* TODO: カテゴリ機能追加後にカテゴリごとのデータを追加 */}
          </div>
        </>
      )}
      {!isLoading && data?.length === 0 && <div>データがありません</div>}
    </div>
  );
}
