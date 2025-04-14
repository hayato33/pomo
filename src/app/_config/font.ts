/**
 * フォント
 * デフォルトはmPlus1
 */
export const FONT_OPTIONS = [
  { value: "mPlus1", label: "M PLUS 1" },
  { value: "notoSansJP", label: "Noto Sans JP" },
  { value: "mochiyPopOne", label: "モッチーポップ" },
  { value: "yuseiMagic", label: "油性マジック" },
  { value: "zenKurenaido", label: "ZEN紅道" },
];

/** フォントのvalue（バリデーション用） */
export const FontValue = [
  "mPlus1",
  "notoSansJP",
  "mochiyPopOne",
  "yuseiMagic",
  "zenKurenaido",
] as const;
