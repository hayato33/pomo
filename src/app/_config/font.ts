/**
 * フォント（以下は仮の設定）
 * デフォルトはfont01
 * TODO: 実際にフォントを設定する
 */
export const FONT_OPTIONS = [
  { value: "font01", label: "フォント1" },
  { value: "font02", label: "フォント2" },
  { value: "font03", label: "フォント3" },
];

/** フォントのvalue（バリデーション用） */
export const FontValue = ["font01", "font02", "font03"] as const;
