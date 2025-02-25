/** Propsの型定義 */
interface FormItemProps {
  label: string;
  id: string;
  disabled: boolean;
  register: any;
  errors: any;
  min: number;
  max: number;
  defaultValue: number;
}

/** ポモドーロタイマー各種数値変更フォームの項目 */
export default function FormItem({
  label,
  id,
  disabled,
  register,
  errors,
  min,
  max,
  defaultValue,
}: FormItemProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="block min-w-28 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          type="number"
          min={min}
          max={max}
          defaultValue={defaultValue}
          id={id}
          className="block w-full min-w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          {...register(id)}
        />
      </div>
      {errors[id] && (
        <p className="mt-1 text-sm text-red-600">{errors[id].message}</p>
      )}
    </div>
  );
}
