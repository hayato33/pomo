"use client";

import Button from "@/components/elements/Button";
import { useState, useEffect } from "react";
import { BsSkipEndFill } from "react-icons/bs";
import { HiPause } from "react-icons/hi2";
import { RiResetLeftFill } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";

/** ポモドーロタイマー初期値 */
const defaultTimerConfig = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 30 * 60,
  totalCycles: 4,
};

/** ポモドーロタイマーフェーズ */
type Phase = "focus" | "short-break" | "long-break";

export default function Page() {
  // 現在のフェーズの残り時間（秒）
  const [remainingTime, setRemainingTime] = useState(defaultTimerConfig.focus);
  // タイマーが動作中かどうか
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // 現在のフェーズ
  const [currentPhase, setCurrentPhase] = useState<Phase>("focus");
  // 現在のサイクル
  const [currentCycle, setCurrentCycle] = useState(1);

  // タイマーのカウントダウンの制御
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime: number) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      handlePhaseComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, remainingTime]);

  /**
   * 現在のフェーズが完了した時の処理
   * - 次のフェーズに移行し、適切な時間をセットする
   * - focus → short-break → focus → ... と繰り返し、最終サイクルのshort-break後にlong-breakに移行する
   */
  const handlePhaseComplete = () => {
    setIsTimerRunning(false);
    if (currentPhase === "focus") {
      setCurrentPhase("short-break");
      setRemainingTime(defaultTimerConfig.shortBreak);
    } else if (currentPhase === "short-break") {
      if (currentCycle === defaultTimerConfig.totalCycles) {
        setCurrentPhase("long-break");
        setRemainingTime(defaultTimerConfig.longBreak);
      } else {
        setCurrentPhase("focus");
        setRemainingTime(defaultTimerConfig.focus);
        setCurrentCycle((prev) => prev + 1);
      }
    } else if (currentPhase === "long-break") {
      setCurrentPhase("focus");
      setRemainingTime(defaultTimerConfig.focus);
      setCurrentCycle(1);
    }
  };

  /** タイマーの開始/停止を切り替える */
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  /** タイマーをデフォルト状態にリセットする */
  const resetTimer = () => {
    setCurrentPhase("focus");
    setIsTimerRunning(false);
    setCurrentCycle(1);
    setRemainingTime(defaultTimerConfig.focus);
  };

  // 現在のフェーズをスキップする関数
  const skipPhase = () => handlePhaseComplete();

  // 表示用の分数を計算
  const minutes = Math.floor(remainingTime / 60);

  // 表示用の秒数を計算
  const seconds = remainingTime % 60;

  // プログレスバーの進捗率を計算
  const percentage =
    (1 -
      remainingTime /
        (currentPhase === "focus"
          ? defaultTimerConfig.focus
          : currentPhase === "short-break"
            ? defaultTimerConfig.shortBreak
            : defaultTimerConfig.longBreak)) *
    100;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative aspect-square w-80 max-w-full">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-current text-gray-200"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="47"
            fill="transparent"
          />
          <circle
            className={`stroke-current ${
              currentPhase === "focus"
                ? "text-primary"
                : currentPhase === "short-break"
                  ? "text-green-500"
                  : "text-blue-500"
            }`}
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="47"
            fill="transparent"
            strokeDasharray="295.31"
            strokeDashoffset={295.31 * (1 - percentage / 100)}
          />
        </svg>
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-800" aria-live="polite">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </span>
          <span
            className="mt-2 text-lg font-medium text-gray-500"
            aria-live="polite"
          >
            {currentPhase === "focus"
              ? "集中時間"
              : currentPhase === "short-break"
                ? "短い休憩"
                : "長い休憩"}
          </span>
          <span className="mt-1 text-sm text-gray-400">
            {currentCycle} / {defaultTimerConfig.totalCycles}
          </span>
        </div>
      </div>
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
    </div>
  );
}
