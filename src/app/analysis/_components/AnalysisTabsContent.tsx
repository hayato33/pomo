import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TabsContent } from "@/app/_components/ui/tabs";
import { PeriodicPomoData } from "@/app/_types/pomodoro";

const chartConfig = {
  time: {
    label: "時間(分)",
  },
  count: {
    label: "回数(回)",
  },
} satisfies ChartConfig;

interface Props {
  value: string;
  chartData: PeriodicPomoData[];
  dataKey: "time" | "count";
}

/** 分析ページのタブコンテンツ */
export default function AnalysisTabsContent({
  value,
  chartData,
  dataKey,
}: Props) {
  const maxValue = chartData.reduce(
    (max, val) => Math.max(val[dataKey], max),
    0
  );

  return (
    <TabsContent value={value} className="-mt-8 sm:mt-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-normal">
            {chartData.length > 0 &&
              `${chartData[0].date} ～ ${chartData[chartData.length - 1].date}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.split("/")[2]}
              />
              <YAxis
                hide
                domain={[0, maxValue]}
                ticks={[
                  0,
                  maxValue * 0.25,
                  maxValue * 0.5,
                  maxValue * 0.75,
                  maxValue,
                ]} // 明示的に目盛りの値を指定
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey={dataKey} fill="hsl(var(--primary))" radius={8}>
                <LabelList
                  position="top"
                  offset={6}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
