import { Skeleton } from "@radix-ui/themes";

/** ランキングページ用スケルトンローディング */
export const RankingLoading: React.FC = () => (
  <Skeleton width="100%" height="800px" className="rounded-md" />
);
