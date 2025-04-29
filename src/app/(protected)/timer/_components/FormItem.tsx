import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TimerSettings } from "@/app/_config/timerConfig";

/** Propsの型定義 */
interface FormItemProps {
  label: string;
  explain: string;
  id: keyof TimerSettings;
  disabled: boolean;
  register: UseFormRegister<TimerSettings>;
  errors: FieldErrors<TimerSettings>;
  min: number;
  max: number;
}

/** ポモドーロタイマー各種数値変更フォームの項目 */
export default function FormItem({
  label,
  explain,
  id,
  disabled,
  register,
  errors,
  min,
  max,
}: FormItemProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="grid min-w-28 text-sm text-gray-900 dark:text-gray-200"
        >
          <p className="font-medium">{label}</p>
          <p className="text-xs text-gray-700 dark:text-gray-400">{explain}</p>
        </label>
        <input
          type="number"
          min={min}
          max={max}
          id={id}
          className="block w-20 rounded-lg border border-gray-300 bg-white/75 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black/75 dark:text-gray-200"
          disabled={disabled}
          {...register(id)}
        />
      </div>
      {errors[id]?.message && (
        <p className="mt-1 text-sm text-red-600">{errors[id].message}</p>
      )}
    </div>
  );
}
