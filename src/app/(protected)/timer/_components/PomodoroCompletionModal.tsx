import { Button } from "@/app/_components/elements/Button";
import { Modal } from "@/app/_components/elements/Modal";
import { PomodoroLog } from "@/app/_components/elements/PomodoroLog";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useUser } from "@/app/_hooks/useUser";
import { createPomodoroLog } from "../_lib/createPomodoroLog";
import { TimerSettings } from "@/app/_config/timerConfig";
import Confetti from "./Confetti";
import { PomodoroLogType } from "@/app/_types/pomodoro";

interface Props {
  storedSettings: TimerSettings;
  isPomodoroCompletionModalOpen: boolean;
  setIsPomodoroCompletionModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  categoryIds: string[];
}

export default function PomodoroCompletionModal({
  storedSettings,
  isPomodoroCompletionModalOpen,
  setIsPomodoroCompletionModalOpen,
  categoryIds,
}: Props) {
  const { token } = useSupabaseSession();
  const { data: userData } = useUser();
  const currentUser = userData?.data;

  const onSubmitPomodoroLogModal = async (displayInTimeline: boolean) => {
    setIsPomodoroCompletionModalOpen(false);
    await createPomodoroLog({
      completedCount: storedSettings.cycles,
      completedTime: storedSettings.focusTime,
      displayInTimeline,
      categoryIds,
      token: token ?? "",
    });
    Confetti();
  };

  // プレビュー用のログデータ
  const log: PomodoroLogType = {
    user: {
      nickname: currentUser?.nickname ?? "",
      profileImageKey: currentUser?.profileImageKey ?? null,
    },
    completedTime: storedSettings.focusTime,
    completedCount: storedSettings.cycles,
    loggedAt: new Date(),
  };

  return (
    <Modal
      isOpen={isPomodoroCompletionModalOpen}
      onClose={() => onSubmitPomodoroLogModal(false)}
    >
      <div className="grid gap-4">
        <h2 className="text-xl font-bold">
          1サイクル終了🎉🎉🎉
          <br />
          お疲れ様でした🎉🎉🎉
        </h2>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>タイムラインに投稿しますか？</p>
          <div className="flex gap-4">
            <Button onClick={() => onSubmitPomodoroLogModal(true)}>はい</Button>
            <Button
              variant="outline"
              onClick={() => onSubmitPomodoroLogModal(false)}
            >
              いいえ
            </Button>
          </div>
        </div>
        <h3 className="border-b border-gray-900 pb-1 text-lg font-bold">
          プレビュー
        </h3>
        <PomodoroLog log={log} />
      </div>
    </Modal>
  );
}
