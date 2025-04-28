"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/app/_components/Chart";
import { TabsContent } from "@/app/_components/Tabs";
import { CategoryStats } from "@/app/_types/category";

interface Props {
  totalTimeByCategory: CategoryStats[];
  period: "daily" | "weekly" | "monthly" | "yearly";
}
export default function CategoryChartChild({
  totalTimeByCategory,
  period,
}: Props) {
  if (totalTimeByCategory.length === 0)
    return <TabsContent value={period}>データがありません</TabsContent>;

  const chartData = totalTimeByCategory.map((data, index) => ({
    category: data.categoryName,
    total: Number(data.totalTime),
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
  const chartConfig = totalTimeByCategory.reduce<ChartConfig>(
    (acc, data, index) => {
      acc[data.categoryName] = {
        label: `${data.categoryName} (${data.percentage}%)`,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    },
    {
      total: {
        label: "合計時間",
      },
    }
  );

  return (
    <TabsContent value={period}>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <Pie data={chartData} dataKey="total" />
          <ChartLegend
            content={<ChartLegendContent nameKey="category" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </TabsContent>
  );
}
