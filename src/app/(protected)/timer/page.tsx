"use client";

import { useState, useEffect } from "react";
import PomodoroTimer from "./_components/PomodoroTimer";
import TimerController from "./_components/TimerController";
import TimerSettingsForm from "./_components/TimerSettingsForm";
import {
  DEFAULT_TIMER_SETTINGS,
  TIMER_SETTINGS_KEY,
  TimerSettings,
} from "@/app/_config/timerConfig";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import PomodoroCompletionModal from "./_components/PomodoroCompletionModal";
import { getImageUrl } from "@/app/_utils/getImageUrl";
import { useSetting } from "@/app/_hooks/useSetting";
import useTimerAudio from "./_hooks/useTimerAudio";
import ExplainText from "./_components/ExplainText";

/** ポモドーロタイマーフェーズ */
export type PomodoroTimerPhase = "focus" | "short-break" | "long-break";

export default function Page() {
  const [isPomodoroCompletionModalOpen, setIsPomodoroCompletionModalOpen] =
    useState(false);
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
  // タイマーが完了したかどうか（自然終了かユーザー操作による停止かを区別）
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);

  // 背景画像のURL
  const setting = useSetting();
  const bgImageKey = setting?.data?.data?.backgroundImageKey;
  const [bgImageUrl, setBgImageUrl] = useState<null | string>(null);
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (bgImageKey) {
        const url = await getImageUrl(bgImageKey, "background-image");
        setBgImageUrl(url);
      }
    };
    fetchImageUrl();
  }, [bgImageKey]);

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
    // タイマーが自然に完了したことを示す
    setIsTimerCompleted(true);

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
      setIsPomodoroCompletionModalOpen(true);
      setCurrentPhase("focus");
      setRemainingTime(storedSettings.focusTime * 60);
      setCurrentCycle(1);
    }
  };

  /** タイマーをデフォルト状態にリセットする */
  const resetTimer = () => {
    setCurrentPhase("focus");
    setIsTimerRunning(false);
    setIsTimerCompleted(false);
    setCurrentCycle(1);
    // 常に最新のstoredSettingsを使用
    setRemainingTime(storedSettings.focusTime * 60);
  };

  // タイマーを手動で開始/停止するための関数
  const toggleTimer = () => {
    if (isTimerRunning) {
      // タイマーを停止する場合
      setIsTimerRunning(false);
      setIsTimerCompleted(false);
    } else {
      // タイマーを開始する場合
      setIsTimerRunning(true);
    }
  };

  // タイマーの音声管理
  useTimerAudio({
    currentPhase,
    isTimerRunning,
    isTimerCompleted,
  });

  return (
    <div
      className="absolute inset-0 flex min-h-[calc(100vh-9.5rem)] w-full overflow-auto bg-cover bg-center py-4"
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : "none",
      }}
    >
      <div className="my-auto flex w-full flex-1 flex-col items-center justify-center gap-6">
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
          toggleTimer={toggleTimer}
          handlePhaseComplete={handlePhaseComplete}
          resetTimer={resetTimer}
        />
        <ExplainText storedSettings={storedSettings} />
        <TimerSettingsForm
          resetTimer={resetTimer}
          storedSettings={storedSettings}
          setStoredSettings={setStoredSettings}
        />
        <PomodoroCompletionModal
          storedSettings={storedSettings}
          isPomodoroCompletionModalOpen={isPomodoroCompletionModalOpen}
          setIsPomodoroCompletionModalOpen={setIsPomodoroCompletionModalOpen}
        />
      </div>
    </div>
  );
}
