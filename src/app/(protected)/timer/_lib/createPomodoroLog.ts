import { fetcher } from "@/app/_utils/fetcher";
import { supabase } from "@/app/_utils/supabase";

interface Props {
  completedCount: number;
  completedTime: number;
  displayInTimeline: boolean;
  categoryIds: string[];
  token: string;
}

export const createPomodoroLog = async ({
  completedCount,
  completedTime,
  displayInTimeline,
  categoryIds,
  token,
}: Props): Promise<void> => {
  try {
    await fetcher({
      apiPath: "/api/pomodoro",
      method: "POST",
      body: {
        completedCount,
        completedTime,
        displayInTimeline,
        categoryIds,
      },
      token,
    });
  } catch (error) {
    console.error("ポモドーロログの作成に失敗しました", error);

    // 認証エラーの場合はリトライを試行
    if (
      error instanceof Error &&
      (error.message.includes("認証") ||
        error.message.includes("unauthorized") ||
        error.message.includes("401"))
    ) {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "認証エラーを検出。セッションを更新してリトライします..."
          );
        }

        // 最新のセッションを取得
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.access_token) {
          throw new Error("セッションの更新に失敗しました");
        }

        // 新しいトークンでリトライ
        await fetcher({
          apiPath: "/api/pomodoro",
          method: "POST",
          body: {
            completedCount,
            completedTime,
            displayInTimeline,
            categoryIds,
          },
          token: session.access_token,
        });

        if (process.env.NODE_ENV === "development") {
          console.log("リトライによりポモドーロログの作成に成功しました");
        }
        return;
      } catch (retryError) {
        console.error("リトライも失敗しました", retryError);
        throw new Error("認証エラー: ログインし直してください");
      }
    }

    throw error;
  }
};
