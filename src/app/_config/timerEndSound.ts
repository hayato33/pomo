/**
 * 集中時間・小休憩・長休憩終了時サウンドの設定（以下は仮の設定）
 * デフォルトはサウンドなし
 * TODO: 実際にサウンドを設定する
 */
export const TIMER_END_SOUND_OPTIONS = [
  { value: "noSound", label: "サウンドなし" },
  { value: "sound1", label: "サウンド1" },
  { value: "sound2", label: "サウンド2" },
];

/** 集中時間・小休憩・長休憩終了時サウンドのvalue（バリデーション用） */
export const TimerEndSoundValue = ["noSound", "sound1", "sound2"] as const;
