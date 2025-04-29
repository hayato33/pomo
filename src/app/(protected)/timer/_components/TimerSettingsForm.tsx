import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/app/_components/elements/Button";
import { useForm } from "react-hook-form";
import FormItem from "./FormItem";
import {
  DEFAULT_TIMER_SETTINGS,
  TimerSettings,
} from "@/app/_config/timerConfig";
import { useEffect, useState } from "react";
import { Modal } from "@/app/_components/elements/Modal";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/app/_components/elements/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { timerSettingsFormSchema } from "../_lib/timerSettingsFormSchema";
import { toast } from "react-toastify";

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
    resolver: zodResolver(timerSettingsFormSchema),
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
      toast.success("タイマー設定を更新しました");
    }
  };

  const timerSettingsReset = () => {
    const defaultSettings = { ...DEFAULT_TIMER_SETTINGS }; // デフォルト設定を適用
    reset(defaultSettings); // フォームをリセット
    setStoredSettings(defaultSettings); // ローカルストレージを更新
    resetTimer(); // タイマーをリセット
  };

  return (
    <Collapsible className="flex flex-col justify-center gap-4">
      <CollapsibleTrigger className="mx-auto flex w-fit items-center justify-center gap-2 rounded-md bg-white/75 px-4 py-2 backdrop-blur">
        <h4 className="text-sm font-semibold">タイマー設定を開く</h4>
        <ChevronsUpDown className="h-4 w-4" />
        <span className="sr-only">Toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-lg border bg-white/70 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-bold">タイマー設定</h3>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="grid gap-4">
            <FormItem
              label="集中時間(分)"
              explain="1〜90分（デフォルト：25分）"
              id="focusTime"
              register={register}
              errors={errors}
              disabled={isSubmitting}
              min={1}
              max={90}
            />
            <FormItem
              label="短い休憩時間(分)"
              explain="1〜30分（デフォルト：5分）"
              id="shortBreakTime"
              register={register}
              errors={errors}
              disabled={isSubmitting}
              min={1}
              max={30}
            />
            <FormItem
              label="長い休憩時間(分)"
              explain="1〜90分（デフォルト：30分）"
              id="longBreakTime"
              register={register}
              errors={errors}
              disabled={isSubmitting}
              min={1}
              max={90}
            />
            <FormItem
              label="サイクル数(回)"
              explain="1〜10回（デフォルト：4回）"
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
                type="button"
                onClick={timerSettingsReset}
                disabled={isSubmitting}
                className="!bg-transparent backdrop-blur-none"
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
      </CollapsibleContent>
    </Collapsible>
  );
}
