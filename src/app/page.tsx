"use client";

import { useState } from "react";
import PomodoroTimer from "./(timer)/_components/PomodoroTimer";
import TimerController from "./(timer)/_components/TimerController";
import TimerSettingsForm from "./(timer)/_components/TimerSettingsForm";

/** ポモドーロタイマー各数値の型定義 */
interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
  totalCycles: number;
}
/** ポモドーロタイマー初期値 */
export const defaultTimerConfig: TimerConfig = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 30 * 60,
  totalCycles: 4,
} as const;

/** ポモドーロタイマーフェーズ */
export type PomodoroTimerPhase = "focus" | "short-break" | "long-break";

export default function Page() {
  // 現在のフェーズの残り時間（秒）
  const [remainingTime, setRemainingTime] = useState(defaultTimerConfig.focus);
  // タイマーが動作中かどうか
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // 現在のフェーズ
  const [currentPhase, setCurrentPhase] = useState<PomodoroTimerPhase>("focus");
  // 現在のサイクル
  const [currentCycle, setCurrentCycle] = useState(1);

  /**
   * 現在のフェーズが完了した時の処理
   * 次のフェーズに移行し、適切な時間をセットする
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

  /** タイマーをデフォルト状態にリセットする */
  const resetTimer = () => {
    setCurrentPhase("focus");
    setIsTimerRunning(false);
    setCurrentCycle(1);
    setRemainingTime(defaultTimerConfig.focus);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <PomodoroTimer
        isTimerRunning={isTimerRunning}
        handlePhaseComplete={handlePhaseComplete}
        currentPhase={currentPhase}
        currentCycle={currentCycle}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
      />
      <TimerController
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        handlePhaseComplete={handlePhaseComplete}
        resetTimer={resetTimer}
      />
      <TimerSettingsForm />
    </div>
  );
}
