"use client";

import PomodoroLog from "../_components/elements/PomodoroLog";
import { TimelineLoading } from "./_components/TimelineLoading";
import { useTimelinePomodoro } from "./_hooks/useTimelinePomodoro";
import { PomodoroLogResponse } from "../types/pomodoro";

/** タイムラインページ */
export default function Page() {
  const { data, isLoading, isError } = useTimelinePomodoro();
  const logs = data?.data;

  if (isError) return <div>エラーが発生しました</div>;
  if (logs?.length === 0) return <div>ログがありません</div>;

  return (
    <div className="mx-auto max-w-[400px]">
      <h1 className="mb-6 text-2xl font-bold">タイムライン</h1>
      <div className="flex flex-col items-center justify-center gap-6">
        {isLoading && <TimelineLoading />}
        {logs?.map((log: PomodoroLogResponse) => (
          <PomodoroLog
            key={log.id}
            name={log.user.nickname}
            profileImageKey={log.user.profileImageKey}
            completedTime={log.completedTime}
            completedCount={log.completedCount}
            loggedAt={new Date(log.loggedAt)}
          />
        ))}
      </div>
    </div>
  );
}
