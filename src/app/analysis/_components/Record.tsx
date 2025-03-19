import ChartCard from "./ChartCard";
import { SegmentedControl } from "@radix-ui/themes";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import AnalysisPomodoroLog from "../_types/analysisPomodoroLog";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  logs: AnalysisPomodoroLog[];
}

export default function Record({ logs }: Props) {
  console.log(logs);

  return (
    <ChartCard title="ポモドーロ記録">
      <div className="absolute right-4 top-4 grid grid-cols-2 gap-4">
        <SegmentedControl.Root defaultValue="time" size="1">
          <SegmentedControl.Item value="time">時間</SegmentedControl.Item>
          <SegmentedControl.Item value="count">回数</SegmentedControl.Item>
        </SegmentedControl.Root>
        <SegmentedControl.Root defaultValue="weekly" size="1">
          <SegmentedControl.Item value="weekly">週間</SegmentedControl.Item>
          <SegmentedControl.Item value="monthly">月間</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>2025/03/24 - 2025/03/31</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </ChartCard>
  );
}
