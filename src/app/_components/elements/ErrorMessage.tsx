/**
 * エラーメッセージを表示するコンポーネント
 * @example
 * ```tsx
 * <ErrorMessage message={errors[id]?.message} />
 * ```
 */
export const ErrorMessage = ({ message }: { message?: string }) => {
  return message && <p className="mt-1 text-sm text-red-600">{message}</p>;
};
