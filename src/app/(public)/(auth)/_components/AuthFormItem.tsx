import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../_lib/authSchema";

interface Props {
  id: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
}

/** サインアップ/ログインフォームの入力フィールド */
export default function AuthFormItem({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
  isSubmitting,
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        disabled={isSubmitting}
        required
        {...register(id)}
      />
      {errors[id]?.message && (
        <p className="mt-1 text-sm text-red-600">{errors[id].message}</p>
      )}
    </div>
  );
}
