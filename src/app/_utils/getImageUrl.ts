import { supabase } from "@/app/_utils/supabase";

/**
 * Supabase Storageから画像の公開URLを取得する関数
 * @param imagePath - 画像のパス
 * @param bucketName - バケット名
 * @returns 画像の公開URL
 * @example
 * const url = await getImageUrl('private/1234-5678', 'avatars');
 */
export const getImageUrl = async (
  imagePath: string,
  bucketName: string
): Promise<string | null> => {
  if (!imagePath) return null;

  const {
    data: { publicUrl },
  } = await supabase.storage.from(bucketName).getPublicUrl(imagePath);

  return publicUrl;
};
