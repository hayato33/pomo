"use client";

import { useState, useEffect } from "react";
import PomodoroTimer from "./(timer)/_components/PomodoroTimer";
import TimerController from "./(timer)/_components/TimerController";
import TimerSettingsForm from "./(timer)/_components/TimerSettingsForm";
import { DEFAULT_TIMER_SETTINGS, TIMER_SETTINGS_KEY, TimerSettings } from "@/config/timerConfig";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/** ポモドーロタイマーフェーズ */
export type PomodoroTimerPhase = "focus" | "short-break" | "long-break";

export default function Page() {
  // ローカルストレージから設定を取得
  const [storedSettings, setStoredSettings] = useLocalStorage<TimerSettings>(
    TIMER_SETTINGS_KEY,
    DEFAULT_TIMER_SETTINGS
  );

  // 現在のフェーズの残り時間（秒）
  const [remainingTime, setRemainingTime] = useState(
    storedSettings.focusTime * 60
  );
  // タイマーが動作中かどうか
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // 現在のフェーズ
  const [currentPhase, setCurrentPhase] = useState<PomodoroTimerPhase>("focus");
  // 現在のサイクル
  const [currentCycle, setCurrentCycle] = useState(1);

  // 設定が変更されたときに残り時間を更新する
  useEffect(() => {
    if (currentPhase === "focus") {
      setRemainingTime(storedSettings.focusTime * 60);
    } else if (currentPhase === "short-break") {
      setRemainingTime(storedSettings.shortBreakTime * 60);
    } else if (currentPhase === "long-break") {
      setRemainingTime(storedSettings.longBreakTime * 60);
    }
  }, [storedSettings, currentPhase]);

  /**
   * 現在のフェーズが完了した時の処理
   * 次のフェーズに移行し、適切な時間をセットする
   */
  const handlePhaseComplete = () => {
    setIsTimerRunning(false);
    if (currentPhase === "focus") {
      setCurrentPhase("short-break");
      setRemainingTime(storedSettings.shortBreakTime * 60);
    } else if (currentPhase === "short-break") {
      if (currentCycle === storedSettings.cycles) {
        setCurrentPhase("long-break");
        setRemainingTime(storedSettings.longBreakTime * 60);
      } else {
        setCurrentPhase("focus");
        setRemainingTime(storedSettings.focusTime * 60);
        setCurrentCycle((prev) => prev + 1);
      }
    } else if (currentPhase === "long-break") {
      setCurrentPhase("focus");
      setRemainingTime(storedSettings.focusTime * 60);
      setCurrentCycle(1);
    }
  };

  /** タイマーをデフォルト状態にリセットする */
  const resetTimer = () => {
    setCurrentPhase("focus");
    setIsTimerRunning(false);
    setCurrentCycle(1);
    // 常に最新のstoredSettingsを使用
    setRemainingTime(storedSettings.focusTime * 60);
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
        timerSettings={storedSettings}
      />
      <TimerController
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        handlePhaseComplete={handlePhaseComplete}
        resetTimer={resetTimer}
      />
      <TimerSettingsForm resetTimer={resetTimer} storedSettings={storedSettings} setStoredSettings={setStoredSettings} />
    </div>
  );
}
