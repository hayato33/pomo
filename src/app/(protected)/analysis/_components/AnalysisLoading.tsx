import { Skeleton } from "@radix-ui/themes";

/** 分析ページのローディング表示コンポーネント */
export default function AnalysisLoading() {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <Skeleton height="120px" width="100%" className="rounded-md" />
        <Skeleton height="120px" width="100%" className="rounded-md" />
        <Skeleton height="120px" width="100%" className="rounded-md" />
        <Skeleton height="120px" width="100%" className="rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <Skeleton height="400px" width="100%" className="rounded-md" />
        <Skeleton height="400px" width="100%" className="rounded-md" />
      </div>
    </>
  );
}
