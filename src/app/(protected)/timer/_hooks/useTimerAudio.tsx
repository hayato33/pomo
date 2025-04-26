import { useSetting } from "@/app/_hooks/useSetting";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { PomodoroTimerPhase } from "../page";

interface Props {
  currentPhase: PomodoroTimerPhase;
  isTimerRunning: boolean;
  isTimerCompleted: boolean;
}

/** ポモドーロタイマーの音声管理コンポーネント */
export default function useTimerAudio({
  currentPhase,
  isTimerRunning,
  isTimerCompleted,
}: Props) {
  const { data: settings, isLoading } = useSetting();
  const {
    focusTimeBgm,
    shortBreakBgm,
    longBreakBgm,
    focusTimeSound,
    shortBreakSound,
    longBreakSound,
    soundVolume,
  } = settings?.data || {};

  // 音声プレーヤーと状態管理用のref
  const bgmPlayerRef = useRef<Tone.Player | null>(null);
  const hasPlayedCompletionSoundRef = useRef(false);
  const isAudioStarted = useRef(false);
  const [completionSoundPath, setCompletionSoundPath] = useState("");

  // 音量を0〜1の範囲に正規化
  const volume = soundVolume ? soundVolume / 100 : 0;

  // 各フェーズの設定をまとめたオブジェクト
  const phaseSettings = useMemo(
    () => ({
      focus: { bgm: focusTimeBgm, sound: focusTimeSound },
      "short-break": { bgm: shortBreakBgm, sound: shortBreakSound },
      "long-break": { bgm: longBreakBgm, sound: longBreakSound },
    }),
    [
      focusTimeBgm,
      shortBreakBgm,
      longBreakBgm,
      focusTimeSound,
      shortBreakSound,
      longBreakSound,
    ]
  );

  // 指定されたフェーズの効果音のパスを取得する
  const getSoundPath = useCallback(
    (phase: PomodoroTimerPhase) => {
      if (!isLoading && settings?.data) {
        const soundPath = phaseSettings[phase]?.sound;
        return soundPath === "noSound" || !soundPath
          ? ""
          : `/sound/${soundPath}.mp3`;
      }
      return "";
    },
    [isLoading, settings, phaseSettings]
  );

  // Tone
  const createPlayer = useCallback(
    (url: string, isLoop: boolean, onReady?: () => void) => {
      if (!url) return null;
      return new Tone.Player({
        url,
        loop: isLoop,
        volume: Tone.gainToDb(volume),
        onload: () => onReady?.(),
      }).toDestination();
    },
    [volume]
  );

  // Tone.jsのオーディオコンテキストを開始する
  const startAudioContext = useCallback(async () => {
    if (!isAudioStarted.current && Tone.getContext().state !== "running") {
      await Tone.start();
      isAudioStarted.current = true;
    }
  }, []);

  // ユーザーインタラクション（クリックまたはタッチ）でオーディオコンテキストを開始する
  useEffect(() => {
    const handleUserInteraction = async () => {
      await startAudioContext();
    };
    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [startAudioContext]);

  // コンポーネントのアンマウント時にBGMプレーヤーを破棄する
  useEffect(() => {
    return () => {
      bgmPlayerRef.current?.dispose();
    };
  }, []);

  // 現在のフェーズに応じたBGMを設定・再生する
  useEffect(() => {
    const currentBgm =
      !isLoading && settings?.data ? phaseSettings[currentPhase]?.bgm : null;
    const bgmPath =
      currentBgm && currentBgm !== "noBgm" ? `/bgm/${currentBgm}.mp3` : "";

    if (!bgmPath) {
      if (bgmPlayerRef.current) {
        bgmPlayerRef.current.stop();
        bgmPlayerRef.current.dispose();
        bgmPlayerRef.current = null;
      }
      return;
    }
    if (bgmPlayerRef.current) {
      bgmPlayerRef.current.stop();
      bgmPlayerRef.current.dispose();
    }
    const player = createPlayer(bgmPath, true, () => {
      if (isTimerRunning && player?.loaded) player?.start();
    });
    bgmPlayerRef.current = player;
    return () => {
      player?.stop();
      player?.dispose();
    };
  }, [
    currentPhase,
    settings,
    isLoading,
    phaseSettings,
    isTimerRunning,
    createPlayer,
  ]);

  // タイマー状態に応じて完了時に再生する効果音のパスを設定する
  useEffect(() => {
    if (isTimerRunning) {
      hasPlayedCompletionSoundRef.current = false;
      setCompletionSoundPath(getSoundPath(currentPhase));
    } else if (!isTimerCompleted) {
      setCompletionSoundPath("");
    }
  }, [isTimerRunning, currentPhase, isTimerCompleted, getSoundPath]);

  // タイマー完了時に効果音を再生する
  // タイマーが停止し、完了状態で、効果音パスが設定されており、まだ再生されていない場合に実行
  useEffect(() => {
    if (
      !isTimerRunning &&
      isTimerCompleted &&
      completionSoundPath &&
      !hasPlayedCompletionSoundRef.current
    ) {
      const playCompletionSound = async () => {
        await startAudioContext();
        const completionPlayer = new Tone.Player({
          url: completionSoundPath,
          volume: Tone.gainToDb(volume),
          autostart: true,
          onstop: () => completionPlayer.dispose(),
        }).toDestination();
      };
      playCompletionSound();
      hasPlayedCompletionSoundRef.current = true;
    }
  }, [
    isTimerCompleted,
    isTimerRunning,
    completionSoundPath,
    startAudioContext,
    volume,
  ]);

  // タイマーの実行状態に応じてBGMの再生・停止を制御する
  useEffect(() => {
    if (bgmPlayerRef.current) {
      if (isTimerRunning && bgmPlayerRef.current.loaded) {
        bgmPlayerRef.current.start();
      } else {
        bgmPlayerRef.current.stop();
      }
    }
  }, [isTimerRunning]);

  return null;
}
