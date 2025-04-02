import { uploadImage } from "@/app/_utils/imageUpload";
import { ChangeEvent, useState } from "react";
import { UpdateData } from "../_types/updateData";
import { UseFormSetValue } from "react-hook-form";

// 最大ファイルサイズを定義（5MB）
const MAX_FILE_SIZE = 5;

/** 画像アップロード処理を管理するカスタムフック */
export const useHandleImageChange = (
  fetchImageUrl: (imagePath: string) => Promise<void>,
  bucketName: string,
  setValue: UseFormSetValue<UpdateData>,
  name: "profileImageKey" | "backgroundImageKey"
) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setFileError(null);

    const file = event.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      setFileError(
        `ファイルサイズが大きすぎます。${MAX_FILE_SIZE}MB以下のファイルを選択してください。`
      );
      // input要素をリセット
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      const imagePath = await uploadImage<UpdateData>(
        event,
        bucketName,
        setValue,
        name
      );
      if (imagePath) fetchImageUrl(imagePath);
    } catch (error) {
      console.error("画像のアップロード中にエラーが発生しました", error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    fileError,
    isUploading,
    handleImageChange,
  };
};
