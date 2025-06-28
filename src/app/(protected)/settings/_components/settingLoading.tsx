import { Skeleton } from "@radix-ui/themes";

/** 設定ページのローディング表示コンポーネント */
export const SettingLoading: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* プロフィール設定セクション */}
      <div className="mb-5 flex flex-col border-b border-gray-900 pb-5">
        <Skeleton height="28px" width="150px" className="mb-2" />
        <Skeleton height="14px" width="200px" className="mb-1" />
        <Skeleton height="36px" width="100%" className="mb-4 rounded-md" />
        <Skeleton height="14px" width="200px" className="mb-1" />
        <Skeleton height="36px" width="100%" className="mb-4 rounded-md" />
        <div className="flex items-center gap-4">
          <Skeleton height="112px" width="112px" className="rounded-md" />
          <Skeleton height="34px" width="50px" className="rounded-md" />
        </div>
      </div>

      {/* タイマー設定セクション */}
      <div className="mb-5 flex flex-col gap-3 border-b border-gray-900 pb-5">
        <Skeleton height="28px" width="150px" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
      </div>

      {/* サウンド設定セクション */}
      <div className="mb-5 flex flex-col pb-5">
        <Skeleton height="28px" width="150px" className="mb-2" />
        <div className="flex flex-col gap-1">
          <Skeleton height="14px" width="200px" />
          <Skeleton height="36px" width="100%" className="rounded-md" />
          <Skeleton height="14px" width="200px" />
          <Skeleton height="36px" width="100%" className="rounded-md" />
          <Skeleton height="14px" width="200px" />
          <Skeleton height="36px" width="100%" className="rounded-md" />
          <Skeleton height="14px" width="200px" />
          <Skeleton height="36px" width="100%" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};
