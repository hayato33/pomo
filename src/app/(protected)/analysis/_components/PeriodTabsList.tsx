import { TabsList, TabsTrigger } from "@/app/_components/Tabs";

/**
 * 週間/月間を切り替えるタブリストコンポーネント
 * @param props.type - タブの種類（'time'または'count'）
 * @returns 週間/月間切り替えのタブリスト
 */
export const PeriodTabsList: React.FC<{ type: "time" | "count" }> = ({
  type,
}) => {
  return (
    <TabsList className="relative -top-11 left-32 sm:absolute sm:left-auto sm:right-4 sm:top-4">
      <TabsTrigger value={`${type}-weekly`}>週間</TabsTrigger>
      <TabsTrigger value={`${type}-monthly`}>月間</TabsTrigger>
    </TabsList>
  );
};
