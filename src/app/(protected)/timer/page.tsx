"use client";

import { useState, useEffect, useMemo } from "react";
import { PomodoroTimer } from "./_components/PomodoroTimer";
import { TimerController } from "./_components/TimerController";
import { TimerSettingsForm } from "./_components/TimerSettingsForm";
import {
  DEFAULT_TIMER_SETTINGS,
  TIMER_SETTINGS_KEY,
  TimerSettings,
} from "@/app/_config/timerConfig";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { PomodoroCompletionModal } from "./_components/PomodoroCompletionModal";
import { getImageUrl } from "@/app/_utils/getImageUrl";
import { useSetting } from "@/app/_hooks/useSetting";
import { useTimerAudio } from "./_hooks/useTimerAudio";
import { ExplainText } from "./_components/ExplainText";
import { createPomodoroLog } from "./_lib/createPomodoroLog";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { generateRandomInt } from "./_lib/generateRandomFloor";
import { toast } from "react-toastify";
import { CategorySetting } from "./_components/CategorySetting";
import { CategoryOption } from "./_types/category";

/** ポモドーロタイマーフェーズ */
export type PomodoroTimerPhase = "focus" | "short-break" | "long-break";

export default function Page() {
  const { token } = useSupabaseSession();
  const [isPomodoroCompletionModalOpen, setIsPomodoroCompletionModalOpen] =
    useState(false);
  // ローカルストレージから設定を取得
  const [storedSettings, setStoredSettings] = useLocalStorage<TimerSettings>(
    TIMER_SETTINGS_KEY,
    DEFAULT_TIMER_SETTINGS
  );

  // カテゴリー
  const initialCategories = useMemo<CategoryOption[]>(() => [], []);
  const [selectedCategories, setSelectedCategories] = useLocalStorage<
    CategoryOption[]
  >("selected-categories", initialCategories);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  useEffect(() => {
    setCategoryIds(selectedCategories.map((c) => c.value));
  }, [selectedCategories]);

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

  // ユーザー設定取得
  const setting = useSetting();
  // 背景画像のURL
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
  // タイマー自動開始設定
  const autoStartShortBreak = setting?.data?.data?.autoStartShortBreak;
  const autoStartFocusTime = setting?.data?.data?.autoStartFocusTime;
  const autoStartLongBreak = setting?.data?.data?.autoStartLongBreak;
  // タイムラインへの投稿画面の表示/非表示
  const postButtonToTimeline = setting?.data?.data?.postButtonToTimeline;
  // ランダム
  const setRandomTime = setting?.data?.data?.setRandomTime;

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
  const handlePhaseComplete = async () => {
    setIsTimerRunning(false);
    // タイマーが自然に完了したことを示す
    setIsTimerCompleted(true);

    if (currentPhase === "focus") {
      // 集中時間⇒小休憩
      setCurrentPhase("short-break");
      setRemainingTime(storedSettings.shortBreakTime * 60);
      if (autoStartShortBreak) setIsTimerRunning(true);
    } else if (currentPhase === "short-break") {
      if (currentCycle === storedSettings.cycles) {
        // 小休憩⇒長休憩
        setCurrentPhase("long-break");
        setRemainingTime(storedSettings.longBreakTime * 60);
        if (autoStartLongBreak) setIsTimerRunning(true);
      } else {
        // 小休憩⇒集中時間
        setCurrentPhase("focus");
        setRemainingTime(storedSettings.focusTime * 60);
        setCurrentCycle((prev) => prev + 1);
        if (autoStartFocusTime) setIsTimerRunning(true);
      }
    } else if (currentPhase === "long-break") {
      // 長休憩⇒集中時間
      if (postButtonToTimeline) {
        setIsPomodoroCompletionModalOpen(true);
      } else {
        await createPomodoroLog({
          completedCount: storedSettings.cycles,
          completedTime: storedSettings.focusTime,
          displayInTimeline: false,
          categoryIds,
          token: token ?? "",
        });
      }
      if (setRandomTime) {
        // ランダムな設定をセット
        setStoredSettings({
          focusTime: generateRandomInt(90),
          shortBreakTime: generateRandomInt(30),
          longBreakTime: generateRandomInt(90),
          cycles: generateRandomInt(10),
        });
        toast.success("ランダムな設定を適用しました");
      }
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
      <div className="m-auto flex w-full max-w-[600px] flex-1 flex-col items-center justify-center gap-6 p-4">
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
        <CategorySetting
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
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
          categoryIds={categoryIds}
        />
      </div>
    </div>
  );
}
