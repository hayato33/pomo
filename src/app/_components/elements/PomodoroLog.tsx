import UserProfileImage from "./UserProfileImage";
import { Skeleton } from "@radix-ui/themes";
import { PomodoroLogDisplayProps } from "@/app/types/pomodoro";

/** ポモドーロログコンポーネント */
export default function PomodoroLog({
  name,
  profileImageKey,
  completedTime,
  completedCount,
  loggedAt,
  isLoading = false,
}: PomodoroLogDisplayProps) {
  return (
    <Skeleton loading={isLoading}>
      <div className="grid w-full gap-4">
        <div className="flex items-center gap-4">
          <UserProfileImage profileImageKey={profileImageKey} nickname={name} />
          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-sm text-gray-500">{loggedAt.toLocaleString()}</p>
          </div>
        </div>
        <div className="grid gap-2 rounded-md border border-gray-900 px-6 py-4">
          <p>{"🍅".repeat(completedCount)}</p>
          <p>
            {completedTime}分 × {completedCount}回 達成
            {"！".repeat(completedCount)}
          </p>
        </div>
      </div>
    </Skeleton>
  );
}
