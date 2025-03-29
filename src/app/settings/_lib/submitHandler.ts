import { fetcher } from "@/app/_utils/fetcher";
import { UpdateData } from "../_types/updateData";

export const submitHandler = async (formData: UpdateData, token: string) => {
  try {
    const [userRes, settingRes] = await Promise.all([
      fetcher({
        apiPath: "/api/user",
        method: "PUT",
        body: { ...formData },
        token: token || "",
      }),
      fetcher({
        apiPath: "/api/setting",
        method: "PUT",
        body: { ...formData },
        token: token || "",
      }),
    ]);

    if (userRes.status !== "success" || settingRes.status !== "success") {
      throw new Error("ユーザー情報またはユーザー設定の更新に失敗しました");
    }

    // 成功メッセージを表示
    alert("設定を更新しました");
  } catch (error) {
    console.error("設定更新処理中にエラーが発生しました:", error);
    alert("処理中にエラーが発生しました。もう一度お試しください。");
  }
};
