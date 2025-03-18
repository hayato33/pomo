import { useUser } from "@/app/_hooks/useUser";
import { Avatar } from "@radix-ui/themes";

interface Props {
  profileImageKey?: string | null;
  nickname?: string;
}

/**
 * ユーザープロフィール画像を表示するコンポーネント
 * プロフィール画像が利用できない場合は、ニックネームの最初の文字をフォールバックとして表示
 * @param profileImageKey - プロフィール画像のキー
 * @param nickname - ユーザーのニックネーム
 * @returns ユーザープロフィール画像を表示するAvatarコンポーネント
 */
export default function UserProfileImage({ profileImageKey, nickname }: Props) {
  // Propsが渡されていない場合は、ログインしているユーザーデータから取得
  const user = useUser();
  if (!profileImageKey && !nickname) {
    profileImageKey = user?.data?.data?.profileImageKey;
    nickname = user?.data?.data?.nickname;
  }

  return (
    <Avatar
      size="2"
      // src={profileImageKey} // TODO: profileImageKeyからURLを取得する関数を作成
      radius="full"
      variant="solid"
      color="gray"
      fallback={nickname ? nickname[0].toUpperCase() : "?"} // 画像が読み込めない場合のフォールバック（ニックネームの最初の文字または「?」）
    />
  );
}
