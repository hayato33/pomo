import { ChangeEvent } from "react";
import { supabase } from "@/app/_utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { UseFormSetValue, Path, PathValue } from "react-hook-form";

/**
 * 画像をアップロードし、保存されたパスを返す関数
 * @param event - 画像ファイル選択のイベント
 * @param bucketName - アップロード先のバケット名
 * @param setValue - フォームの値を更新するための関数
 * @param fieldName - 更新するフォームフィールド名
 * @returns アップロードされた画像のパス
 */
export const uploadImage = async <T extends object>(
  event: ChangeEvent<HTMLInputElement>,
  bucketName: string,
  setValue: UseFormSetValue<T>,
  fieldName: Path<T>
): Promise<string | null> => {
  if (!event.target.files || event.target.files.length == 0) {
    return null;
  }

  const file = event.target.files[0]; // 選択された画像を取得
  const filePath = `private/${uuidv4()}`; // ファイルパスを指定

  // Supabaseに画像をアップロード
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    alert(error.message);
    return null;
  }

  // フォームの値も更新する
  if (setValue && fieldName) {
    setValue(fieldName, data.path as unknown as PathValue<T, Path<T>>);
  }

  return data.path;
};
