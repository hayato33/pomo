import { fetcher } from "@/app/_utils/fetcher";
import { UpdateData } from "../_types/updateData";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { toast } from "react-toastify";

export const useSubmitHandler = () => {
  const { token } = useSupabaseSession();

  const submitHandler = async (formData: UpdateData) => {
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

      toast.success("設定を更新しました");
    } catch (error) {
      const errorMessage = "設定更新処理中にエラーが発生しました";
      console.error(errorMessage, error);
      toast.error(`${errorMessage}もう一度お試しください。`);
    }
  };

  return { submitHandler };
};
