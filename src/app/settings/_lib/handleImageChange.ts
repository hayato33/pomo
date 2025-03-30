import { uploadImage } from "@/app/_utils/imageUpload";
import { ChangeEvent } from "react";
import { UpdateData } from "../_types/updateData";
import { UseFormSetValue } from "react-hook-form";

// 最大ファイルサイズを定義（5MB）
const MAX_FILE_SIZE = 5;

export const handleImageChange = async (
  event: ChangeEvent<HTMLInputElement>,
  setFileError: (error: string | null) => void,
  setIsUploading: (isUploading: boolean) => void,
  fetchImageUrl: (imagePath: string) => Promise<void>,
  bucketName: string,
  setValue: UseFormSetValue<UpdateData>,
  name: "profileImageKey" | "backgroundImageKey"
): Promise<void> => {
  // エラー状態をリセット
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
