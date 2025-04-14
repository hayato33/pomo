import {
  M_PLUS_1,
  Noto_Sans_JP,
  Mochiy_Pop_One,
  Yusei_Magic,
  Zen_Kurenaido,
} from "next/font/google";

export const mPlus1 = M_PLUS_1({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mPlus1",
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-notoSansJP",
});

export const mochiyPopOne = Mochiy_Pop_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mochiyPopOne",
});

export const yuseiMagic = Yusei_Magic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yuseiMagic",
});

export const zenKurenaido = Zen_Kurenaido({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zenKurenaido",
});
