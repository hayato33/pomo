import ChartCard from "./ChartCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import AnalysisTabsContent from "./AnalysisTabsContent";
import { useState } from "react";
import {
  createCountChartData,
  createTimeChartData,
} from "../_lib/createChartData";
import { PeriodicPomoData } from "@/app/_types/pomodoro";
import PeriodTabsList from "./PeriodTabsList";

interface Props {
  weeklyData: PeriodicPomoData;
  monthlyData: PeriodicPomoData;
}

export default function Record({ weeklyData, monthlyData }: Props) {
  // 期間の状態を管理
  const [periodType, setPeriodType] = useState<"weekly" | "monthly">("weekly");

  const chartData = {
    time: {
      weekly: createTimeChartData(weeklyData),
      monthly: createTimeChartData(monthlyData),
    },
    count: {
      weekly: createCountChartData(weeklyData),
      monthly: createCountChartData(monthlyData),
    },
  };

  return (
    <>
      <ChartCard title="ポモドーロ記録">
        <Tabs defaultValue="time">
          <TabsList className="sm:absolute sm:right-36 sm:top-4">
            <TabsTrigger value="time">時間</TabsTrigger>
            <TabsTrigger value="count">回数</TabsTrigger>
          </TabsList>
          <TabsContent value="time">
            <Tabs
              defaultValue={`time-${periodType}`}
              onValueChange={(value) =>
                setPeriodType(value.split("-")[1] as "weekly" | "monthly")
              }
            >
              <PeriodTabsList type="time" />
              <AnalysisTabsContent
                value="time-weekly"
                chartData={chartData.time.weekly}
                dataKey="time"
              />
              <AnalysisTabsContent
                value="time-monthly"
                chartData={chartData.time.monthly}
                dataKey="time"
              />
            </Tabs>
          </TabsContent>
          <TabsContent value="count">
            <Tabs
              defaultValue={`count-${periodType}`}
              onValueChange={(value) =>
                setPeriodType(value.split("-")[1] as "weekly" | "monthly")
              }
            >
              <PeriodTabsList type="count" />
              <AnalysisTabsContent
                value="count-weekly"
                chartData={chartData.count.weekly}
                dataKey="count"
              />
              <AnalysisTabsContent
                value="count-monthly"
                chartData={chartData.count.monthly}
                dataKey="count"
              />
            </Tabs>
          </TabsContent>
        </Tabs>
      </ChartCard>
    </>
  );
}
