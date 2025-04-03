import { useUser } from "@/app/_hooks/useUser";
import { getImageUrl } from "@/app/_utils/getImageUrl";
import { Avatar } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface Props {
  profileImageKey?: string | null;
  nickname?: string;
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
}

/**
 * ユーザープロフィール画像を表示するコンポーネント
 * プロフィール画像が利用できない場合は、ニックネームの最初の文字をフォールバックとして表示
 * @param profileImageKey - プロフィール画像のキー
 * @param nickname - ユーザーのニックネーム
 * @returns ユーザープロフィール画像を表示するAvatarコンポーネント
 */
export default function UserProfileImage({
  profileImageKey,
  nickname,
  size = "3",
}: Props) {
  // Propsが渡されていない場合は、ログインしているユーザーデータから取得
  const user = useUser();
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  if (!profileImageKey && !nickname) {
    profileImageKey = user?.data?.data?.profileImageKey;
    nickname = user?.data?.data?.nickname;
  }
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (profileImageKey) {
        const url = await getImageUrl(profileImageKey, "profile-image");
        setImageUrl(url);
      }
    };
    fetchImageUrl();
  }, [profileImageKey]);

  return (
    <Avatar
      size={size}
      src={imageUrl ?? undefined}
      radius="full"
      variant="solid"
      color="gray"
      fallback={nickname ? nickname[0].toUpperCase() : "?"} // 画像が読み込めない場合のフォールバック（ニックネームの最初の文字または「?」）
    />
  );
}
