import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/app/_components/elements/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormItem from "./FormItem";
import { DEFAULT_TIMER_SETTINGS, TimerSettings } from "@/app/_config/timerConfig";
import { useEffect, useState } from "react";
import { Modal } from "@/app/_components/elements/Modal";

/**
 * ポモドーロタイマー各種数値変更フォームのバリデーションスキーマ
 * - 集中時間:
 *   - 必須
 *   - 1分以上90分以下
 * - 短い休憩時間:
 *   - 必須
 *   - 1分以上30分以下
 * - 長い休憩時間:
 *   - 必須
 *   - 1分以上90分以下
 * - サイクル数:
 *   - 必須
 *   - 1以上10以下
 */
const schema = z.object({
  focusTime: z.coerce
    .number()
    .min(1, "集中時間は1分以上で入力してください")
    .max(90, "集中時間は90分以下で入力してください"),
  shortBreakTime: z.coerce
    .number()
    .min(1, "短い休憩時間は1分以上で入力してください")
    .max(30, "短い休憩時間は30分以下で入力してください"),
  longBreakTime: z.coerce
    .number()
    .min(1, "長い休憩時間は1分以上で入力してください")
    .max(90, "長い休憩時間は90分以下で入力してください"),
  cycles: z.coerce
    .number()
    .min(1, "サイクル数は1以上で入力してください")
    .max(10, "サイクル数は10以下で入力してください"),
});

/** Propsの型定義 */
interface TimerSettingsFormProps {
  resetTimer: () => void;
  storedSettings: TimerSettings;
  setStoredSettings: (settings: TimerSettings) => void;
}

export default function TimerSettingsForm({
  resetTimer,
  storedSettings,
  setStoredSettings,
}: TimerSettingsFormProps) {
  // ダイアログの表示状態
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  // 確認待ちの設定値
  const [pendingSettings, setPendingSettings] = useState<TimerSettings | null>(
    null
  );

  // フォームの状態管理
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TimerSettings>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: storedSettings,
  });

  // storedSettingsが変更されたらフォームもリセット
  // ただし、ユーザーが直接修正した場合は除く
  useEffect(() => {
    // ユーザーが編集中でない場合のみリセットを適用
    if (!isSubmitting) {
      reset(storedSettings);
    }
  }, [storedSettings, reset, isSubmitting]);

  /** フォーム送信処理 - 確認ダイアログを表示 */
  const onSubmitHandler = async (data: TimerSettings) => {
    setPendingSettings(data);
    setIsConfirmDialogOpen(true);
  };

  /** 設定保存を確定する処理 */
  const confirmSaveSettings = () => {
    if (pendingSettings) {
      // LocalStorageに設定を保存
      setStoredSettings(pendingSettings);
      setPendingSettings(null);
      // タイマーをリセット
      resetTimer();
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-bold">タイマー設定</h3>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="grid gap-4">
        <FormItem
          label="集中時間(分)"
          id="focusTime"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={90}
        />
        <FormItem
          label="短い休憩時間(分)"
          id="shortBreakTime"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={30}
        />
        <FormItem
          label="長い休憩時間(分)"
          id="longBreakTime"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={90}
        />
        <FormItem
          label="サイクル数(回)"
          id="cycles"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={10}
        />

        <div className="flex justify-between">
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              // デフォルト設定を適用
              const defaultSettings = { ...DEFAULT_TIMER_SETTINGS };
              // フォームをリセット
              reset(defaultSettings);
              // ローカルストレージを更新
              setStoredSettings(defaultSettings);
              // タイマーをリセット
              resetTimer();
            }}
            disabled={isSubmitting}
          >
            リセット
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            変更
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">タイマー設定の保存</h2>
          <p>
            設定を保存すると、現在進行中のタイマーが初期化されます。
            <br />
            新しい設定を保存してもよろしいですか？
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                confirmSaveSettings();
                setIsConfirmDialogOpen(false);
              }}
            >
              保存する
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
