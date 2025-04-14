import { useSetting } from "./useSetting";
import {
  mPlus1,
  notoSansJP,
  mochiyPopOne,
  yuseiMagic,
  zenKurenaido,
} from "@/app/_utils/fontLoaders";

/** フォントを取得するカスタムフック */
export function useFont() {
  // ユーザー設定からフォントを取得
  const { data: setting } = useSetting();
  const font = setting?.data?.font || "mPlus1";

  // フォント変数の設定
  let fontVariable = "";
  let fontClass = "";
  switch (font) {
    case "mPlus1":
      fontVariable = mPlus1.variable;
      fontClass = "font-mPlus1";
      break;
    case "notoSansJP":
      fontVariable = notoSansJP.variable;
      fontClass = "font-notoSansJP";
      break;
    case "mochiyPopOne":
      fontVariable = mochiyPopOne.variable;
      fontClass = mochiyPopOne.className;
      break;
    case "yuseiMagic":
      fontVariable = yuseiMagic.variable;
      fontClass = "font-yuseiMagic";
      break;
    case "zenKurenaido":
      fontVariable = zenKurenaido.variable;
      fontClass = "font-zenKurenaido";
      break;
    default:
      fontVariable = mPlus1.variable;
      fontClass = "font-mPlus1";
  }

  return { fontVariable, fontClass };
}
