/**
 * 集中時間中BGM（以下は仮の設定）
 * デフォルトはBGMなし
 * TODO: 実際にBGMを設定する
 */
export const TIMER_BGM_OPTIONS = [
  { value: "noBgm", label: "BGMなし" },
  { value: "focusBoost", label: "Focus Boost" },
  { value: "lofiWorkMode", label: "Lo-Fi Work Mode" },
  { value: "steadyPulse", label: "Steady Pulse" },
  { value: "cinematicFocus", label: "Cinematic Focus" },
  { value: "acousticBreeze", label: "Acoustic Breeze" },
  { value: "cafeProductivity", label: "Cafe Productivity" },
  { value: "natureCocoon", label: "Nature Cocoon" },
  { value: "electroFlow", label: "Electro Flow" },
  { value: "calmFlow", label: "Calm Flow" },
  { value: "pianoSerenity", label: "Piano Serenity" },
];

/** 集中時間中BGMのvalue（バリデーション用） */
export const TimerBgmValue = [
  "noBgm",
  "focusBoost",
  "lofiWorkMode",
  "steadyPulse",
  "cinematicFocus",
  "acousticBreeze",
  "cafeProductivity",
  "natureCocoon",
  "electroFlow",
  "calmFlow",
  "pianoSerenity",
] as const;
