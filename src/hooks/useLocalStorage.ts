import { useState, useEffect } from "react";

/**
 * ローカルストレージの値を扱うためのフックの戻り値型
 */
type Response<T> = [T, (value: T) => void];

/**
 * ローカルストレージを使用するカスタムフック
 * @param key 保存するキー
 * @param initialValue 初期値
 * @example
 * ```tsx
 * const [todos, setTodos] = useLocalStorage('todos', []);
 * ```
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): Response<T> => {
  const [value, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const getValue = (): T => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (e) {
        console.error(e);
        return initialValue;
      }
    };

    setStoredValue(getValue());
  }, [key, initialValue]);

  const setValue = (argValue: T): void => {
    try {
      setStoredValue(argValue);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(argValue));
      }
    } catch (e) {
      console.error(e);
    }
  };
  return [value, setValue];
};
