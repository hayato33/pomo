import { UserProfileImage } from "@/app/_components/elements/UserProfileImage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/Table";
import { useUser } from "@/app/_hooks/useUser";
import { Ranking } from "@/app/_types/ranking";

interface Props {
  data: Ranking[];
  dataType: "count" | "time";
}

const getRankDisplay = (rank: number | string) => {
  const rankNum = typeof rank === "string" ? parseInt(rank, 10) : rank;

  switch (rankNum) {
    case 1:
      return <span className="text-2xl">🥇</span>;
    case 2:
      return <span className="text-xl">🥈</span>;
    case 3:
      return <span className="text-lg">🥉</span>;
    default:
      return rank;
  }
};

export const RankingTable = ({ data, dataType }: Props) => {
  const { data: currentUser } = useUser();
  const currentUserId = currentUser?.data?.id;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-2/12 text-center">順位</TableHead>
          <TableHead className="w-7/12">ユーザー</TableHead>
          <TableHead className="w-3/12 text-center">
            {dataType === "count" ? "回数(回)" : "時間(分)"}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          return (
            <TableRow
              key={item.id}
              className={currentUserId === item.id ? "bg-muted/50" : ""}
            >
              <TableCell className="text-center font-medium">
                {getRankDisplay(item.rank)}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <UserProfileImage
                  profileImageKey={item.profile_image_key}
                  nickname={item.nickname ?? ""}
                  size="2"
                />
                {item.nickname}
              </TableCell>
              <TableCell className="text-center">{item.value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
