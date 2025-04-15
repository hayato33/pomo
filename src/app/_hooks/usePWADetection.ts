import { useEffect, useState } from "react";

/** PWAモードかどうかを検出するカスタムフック */
export const usePWADetection = (): boolean => {
  const [isPWA, setIsPWA] = useState(false);

  // サーバーサイドでの実行時エラーを防ぐため、useEffectを使用
  useEffect(() => {
    setIsPWA(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  return isPWA;
};
