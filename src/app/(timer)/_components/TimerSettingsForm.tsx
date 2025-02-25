import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/elements/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormItem from "./FormItem";

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

/** バリデーションスキーマから推論された型 */
export type FormData = z.infer<typeof schema>;

export default function TimerSettingsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  /** フォーム送信処理 */
  const onSubmitHandler = async (data: FormData) => {
    console.log(data);
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
          defaultValue={25}
        />
        <FormItem
          label="短い休憩時間(分)"
          id="shortBreakTime"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={30}
          defaultValue={5}
        />
        <FormItem
          label="長い休憩時間(分)"
          id="longBreakTime"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={90}
          defaultValue={30}
        />
        <FormItem
          label="サイクル数(回)"
          id="cycles"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={1}
          max={10}
          defaultValue={4}
        />

        <div className="flex justify-between">
          <Button
            variant="outline"
            type="reset"
            onClick={() =>
              reset({
                focusTime: 25,
                shortBreakTime: 5,
                longBreakTime: 30,
                cycles: 4,
              })
            }
            disabled={isSubmitting}
          >
            リセット
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            変更
          </Button>
        </div>
      </form>
    </div>
  );
}
