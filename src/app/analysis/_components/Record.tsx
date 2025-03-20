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
          <TabsList className="absolute right-36 top-4">
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
              <TabsList className="absolute right-4 top-4">
                <TabsTrigger value="time-weekly">週間</TabsTrigger>
                <TabsTrigger value="time-monthly">月間</TabsTrigger>
              </TabsList>
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
              <TabsList className="absolute right-4 top-4">
                <TabsTrigger value="count-weekly">週間</TabsTrigger>
                <TabsTrigger value="count-monthly">月間</TabsTrigger>
              </TabsList>
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
