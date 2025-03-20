"use client";

import PomodoroLog from "../_components/elements/PomodoroLog";
import { TimelineLoading } from "./_components/TimelineLoading";
import { useTimelinePomodoro } from "./_hooks/useTimelinePomodoro";
import { PomodoroLogType } from "../_types/pomodoro";
import { Pagination } from "./_components/Pagination";
import PageTitle from "../_components/elements/PageTItle";

/** タイムラインページ */
export default function Page() {
  const { data, isLoading, isError, pagination, changePage, currentPage } =
    useTimelinePomodoro();

  if (isError) return <div>エラーが発生しました</div>;

  return (
    <div className="mx-auto max-w-[400px]">
      <PageTitle>タイムライン</PageTitle>
      <div className="flex flex-col items-center justify-center gap-6">
        {isLoading && <TimelineLoading />}
        {data?.map((log: PomodoroLogType) => (
          <PomodoroLog key={log.id} log={log} />
        ))}
        {data?.length === 0 && <div>ログがありません</div>}
      </div>
      {pagination?.totalPages > 1 && (
        <Pagination
          pagination={pagination}
          currentPage={currentPage}
          changePage={changePage}
        />
      )}
    </div>
  );
}
