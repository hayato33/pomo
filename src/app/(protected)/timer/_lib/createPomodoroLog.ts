import { fetcher } from "@/app/_utils/fetcher";

interface Props {
  completedCount: number;
  completedTime: number;
  displayInTimeline: boolean;
  token: string;
}

export const createPomodoroLog = async ({
  completedCount,
  completedTime,
  displayInTimeline,
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
      },
      token,
    });
  } catch (error) {
    console.error("ポモドーロログの作成に失敗しました", error);
    throw error;
  }
};
