"use client";

import { ChartCard } from "./ChartCard";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/Tabs";
import { CategoryChartChild } from "./CategoryChartChild";
import { CategoryStats } from "@/app/_types/category";

interface Props {
  dailyTotalTimeByCategory: CategoryStats[];
  weeklyTotalTimeByCategory: CategoryStats[];
  monthlyTotalTimeByCategory: CategoryStats[];
  yearlyTotalTimeByCategory: CategoryStats[];
}

export const CategoryChart: React.FC<Props> = ({
  dailyTotalTimeByCategory,
  weeklyTotalTimeByCategory,
  monthlyTotalTimeByCategory,
  yearlyTotalTimeByCategory,
}) => {
  if (
    dailyTotalTimeByCategory.length === 0 &&
    weeklyTotalTimeByCategory.length === 0 &&
    monthlyTotalTimeByCategory.length === 0 &&
    yearlyTotalTimeByCategory.length === 0
  )
    return null;

  return (
    <ChartCard title="カテゴリー別記録">
      <Tabs defaultValue="daily">
        <TabsList className="sm:absolute sm:right-4 sm:top-4">
          <TabsTrigger value="daily">日</TabsTrigger>
          <TabsTrigger value="weekly">週</TabsTrigger>
          <TabsTrigger value="monthly">月</TabsTrigger>
          <TabsTrigger value="yearly">年</TabsTrigger>
        </TabsList>
        <CategoryChartChild
          totalTimeByCategory={dailyTotalTimeByCategory}
          period="daily"
        />
        <CategoryChartChild
          totalTimeByCategory={weeklyTotalTimeByCategory}
          period="weekly"
        />
        <CategoryChartChild
          totalTimeByCategory={monthlyTotalTimeByCategory}
          period="monthly"
        />
        <CategoryChartChild
          totalTimeByCategory={yearlyTotalTimeByCategory}
          period="yearly"
        />
      </Tabs>
    </ChartCard>
  );
};
