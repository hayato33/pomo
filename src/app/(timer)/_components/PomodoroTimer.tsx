"use client";

import { PomodoroTimerPhase } from "@/app/page";
import { TimerSettings } from "@/config/timerConfig";
import { useEffect } from "react";

/** Propsの型定義 */
interface PomodoroTimerProps {
  isTimerRunning: boolean;
  handlePhaseComplete: () => void;
  currentPhase: PomodoroTimerPhase;
  currentCycle: number;
  remainingTime: number;
  setRemainingTime: (time: number) => void;
  timerSettings: TimerSettings;
}

/**
 * ポモドーロタイマーのメインコンポーネント
 * カウントダウンと表示を担当
 */
export default function PomodoroTimer({
  isTimerRunning,
  handlePhaseComplete,
  currentPhase,
  currentCycle,
  remainingTime,
  setRemainingTime,
  timerSettings,
}: PomodoroTimerProps) {
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
  }, [isTimerRunning, remainingTime, handlePhaseComplete, setRemainingTime]);

  // 表示用の分数を計算
  const minutes = Math.floor(remainingTime / 60);

  // 表示用の秒数を計算
  const seconds = remainingTime % 60;

  // プログレスバーの進捗率を計算
  const percentage =
    (1 -
      remainingTime /
        (currentPhase === "focus"
          ? timerSettings.focusTime * 60
          : currentPhase === "short-break"
            ? timerSettings.shortBreakTime * 60
            : timerSettings.longBreakTime * 60)) *
    100;

  return (
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
          {currentCycle} / {timerSettings.cycles}
        </span>
      </div>
    </div>
  );
}
