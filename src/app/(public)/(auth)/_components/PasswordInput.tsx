/**
 * パスワード入力フィールドコンポーネント
 * - パスワードの表示/非表示切り替え機能
 * - バリデーションエラーメッセージの表示
 * - パスワード要件チェックリストの表示（新規登録時のみ）
 */

import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormData } from "../_lib/authSchema";

interface PasswordInputProps {
  /** React Hook Formのregister関数 */
  register: UseFormRegister<FormData>;
  /** バリデーションエラー情報 */
  error?: FieldError;
  /** フォームの送信中状態 */
  isSubmitting: boolean;
  /** パスワード要件チェックリストの表示フラグ */
  showRequirements?: boolean;
  /** React Hook Formのwatch関数 */
  watch: UseFormWatch<FormData>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  error,
  isSubmitting,
  showRequirements = false,
  watch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password", "");

  /**
   * パスワードの要件チェック
   * - 8文字以上
   * - アルファベットを含む
   * - 数字を含む
   * - 特殊文字を含む
   */
  const passwordRequirements = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*#?&]/.test(password),
  };

  /** パスワードの表示/非表示切り替え */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor="password"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        パスワード
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          {...register("password")}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-gray-600"
          disabled={isSubmitting}
        >
          {showPassword ? (
            <HiEyeOff className="h-5 w-5" />
          ) : (
            <HiEye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {error.message}
        </p>
      )}
      {showRequirements && (
        <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p>パスワードは以下の要件を満たす必要があります：</p>
          <ul className="list-inside space-y-1">
            <li className={passwordRequirements.length ? "text-green-600" : ""}>
              ✓ 8文字以上
            </li>
            <li className={passwordRequirements.letter ? "text-green-600" : ""}>
              ✓ アルファベットを含む
            </li>
            <li className={passwordRequirements.number ? "text-green-600" : ""}>
              ✓ 数字を含む
            </li>
            <li
              className={passwordRequirements.special ? "text-green-600" : ""}
            >
              ✓ 記号（@$!%*#?&）を含む
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
