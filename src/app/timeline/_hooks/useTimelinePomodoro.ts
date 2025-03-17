import useSWR from "swr";
import { fetcher } from "@/app/_utils/fetcher";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useState } from "react";

/**
 * タイムライン用のポモドーロログを取得するカスタムフック
 * @returns ポモドーロログ、ページネーション情報、ローディング状態、エラー状態、データ再取得関数、ページ変更関数
 */
export const useTimelinePomodoro = () => {
  const { token } = useSupabaseSession();
  const [page, setPage] = useState(1);
  // TODO: フロント側で1ページあたりの表示件数を変更できるようにする
  const limit = 10;

  const { data, error, isLoading, mutate } = useSWR(
    token ? `/api/public/pomodoro?page=${page}&limit=${limit}` : null,
    token ? (apiPath) => fetcher({ apiPath, token }) : null
  );

  /** ページを変更する関数 */
  const changePage = (newPage: number) => {
    // 新しいページ番号が1以下または総ページ数を超えていた場合は早期リターン
    if (newPage < 1 || data?.pagination?.totalPages < newPage) return;
    // 新しいページ番号が1以上かつ総ページ数以下の場合のみページを変更する
    setPage(newPage);
  };

  return {
    data: data?.data,
    isLoading,
    isError: !!error,
    mutate,
    pagination: data?.pagination,
    changePage,
    currentPage: page,
    currentLimit: limit,
  };
};
