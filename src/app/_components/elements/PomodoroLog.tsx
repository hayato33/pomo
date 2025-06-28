import { UserProfileImage } from "./UserProfileImage";
import { PomodoroLogType } from "@/app/_types/pomodoro";

/** ポモドーロログコンポーネント */
export const PomodoroLog: React.FC<{ log: PomodoroLogType }> = ({ log }) => {
  return (
    <div className="grid w-full gap-4">
      <div className="flex items-center gap-4">
        <UserProfileImage
          profileImageKey={log.user.profileImageKey}
          nickname={log.user.nickname}
        />
        <div>
          <p className="text-lg font-bold">{log.user.nickname}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(log.loggedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="grid gap-2 rounded-md border border-gray-900 px-6 py-4 dark:border-gray-200">
        <p>{"🍅".repeat(log.completedCount)}</p>
        <p>
          {log.completedTime}分 × {log.completedCount}回 達成
          {"！".repeat(log.completedCount)}
        </p>
      </div>
    </div>
  );
};
