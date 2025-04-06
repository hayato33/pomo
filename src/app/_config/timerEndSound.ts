/**
 * 集中時間・小休憩・長休憩終了時サウンドの設定
 * デフォルトはサウンドなし
 */
export const TIMER_END_SOUND_OPTIONS = [
  { value: "noSound", label: "サウンドなし" },
  { value: "trumpetFanfare", label: "ラッパのファンファーレ" },
  { value: "levelUp", label: "レベルアップ" },
  { value: "pop", label: "パッ" },
  { value: "shakiin", label: "シャキーン" },
  { value: "chanChan", label: "ちゃんちゃん♪" },
  { value: "jajaan", label: "ジャジャーン" },
  { value: "menOh", label: "男衆「オウ！」" },
  { value: "womenOh", label: "女衆「おう！」" },
  { value: "cuckooClock", label: "鳩時計" },
  { value: "ramenYatai", label: "ラーメン屋台登場" },
];

/** 集中時間・小休憩・長休憩終了時サウンドのvalue（バリデーション用） */
export const TimerEndSoundValue = [
  "noSound",
  "trumpetFanfare",
  "levelUp",
  "pop",
  "shakiin",
  "chanChan",
  "jajaan",
  "menOh",
  "womenOh",
  "cuckooClock",
  "ramenYatai",
] as const;
