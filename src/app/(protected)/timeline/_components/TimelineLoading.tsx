import { Skeleton } from "@radix-ui/themes";

/** タイムラインページのローディング表示コンポーネント */
export function TimelineLoading() {
  const skeletons = [];

  for (let i = 0; i < 10; i++) {
    skeletons.push(
      <Skeleton key={i} height="150px" width="100%" className="rounded-md" />
    );
  }

  return <>{skeletons}</>;
}
