import Button from "@/components/elements/Button";
import { BsSkipEndFill } from "react-icons/bs";
import { HiPause } from "react-icons/hi2";
import { RiResetLeftFill } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";

/** Propsの型定義 */
interface TimerControllerProps {
  isTimerRunning: boolean;
  setIsTimerRunning: (isTimerRunning: boolean) => void;
  handlePhaseComplete: () => void;
  resetTimer: () => void;
}

export default function TimerController({
  isTimerRunning,
  setIsTimerRunning,
  handlePhaseComplete,
  resetTimer,
}: TimerControllerProps) {
  /** タイマーの開始/停止を切り替える */
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // 現在のフェーズをスキップする関数
  const skipPhase = () => handlePhaseComplete();

  return (
    <div className="mt-4 grid gap-4">
      <div className="flex gap-4">
        <Button onClick={toggleTimer}>
          {isTimerRunning ? (
            <>
              <HiPause />
              一時停止
            </>
          ) : (
            <>
              <VscDebugStart />
              スタート
            </>
          )}
        </Button>
        <Button variant="outline" onClick={resetTimer}>
          <RiResetLeftFill />
          リセット
        </Button>
      </div>
      <div className="grid place-content-center">
        <Button variant="ghost" onClick={skipPhase}>
          <BsSkipEndFill />
          フェーズスキップ
        </Button>
      </div>
    </div>
  );
}
