import { fetcher } from "@/app/_utils/fetcher";

/**
 * ユーザー情報を取得して存在確認を行う関数
 * @param token アクセストークン
 * @returns ユーザーが存在するかどうか
 */
export const checkUserExists = async (token: string): Promise<boolean> => {
  try {
    await fetcher({
      apiPath: "/api/user",
      method: "GET",
      token,
    });

    return true;
  } catch (error: unknown) {
    // エラーオブジェクトから404ステータスを確認
    if ((error as { status?: number }).status === 404) {
      // 404の場合はユーザーが存在しないと判断
      return false;
    }
    // その他のエラーは上位に伝播させる
    throw error;
  }
};

/**
 * ユーザーを確認し、存在しなければ作成する統合関数
 * @param token アクセストークン
 * @returns ユーザーの存在状態と情報
 */
export const ensureUserExists = async (
  token: string
): Promise<{ exists: boolean; userId?: string }> => {
  try {
    // GETリクエストでユーザーの存在確認
    const userResponse = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: token ?? "",
      },
    });

    // ユーザーが既に存在する場合
    if (userResponse.ok) return { exists: true };

    // ユーザーが存在しない場合は新規作成
    const userId = await createNewUser(token);
    return { exists: false, userId };
  } catch (error) {
    console.error("ユーザー確認・作成処理中にエラーが発生しました:", error);
    throw error;
  }
};

/**
 * ユーザーを作成する関数
 * @param nickname ニックネーム
 * @param token アクセストークン
 * @returns 作成されたユーザーID
 */
export const createUser = async (
  nickname: string,
  token: string
): Promise<string> => {
  try {
    const userResponse = await fetcher({
      apiPath: "/api/user",
      method: "POST",
      body: { nickname },
      token,
    });

    if (!userResponse?.data?.id)
      throw new Error("ユーザーIDが取得できませんでした");

    return userResponse.data.id;
  } catch (error) {
    console.error("ユーザーの作成に失敗しました", error);
    throw error;
  }
};

/**
 * ユーザー設定を作成する関数
 * @param userId ユーザーID
 * @param token アクセストークン
 */
export const createUserSetting = async (
  userId: string,
  token: string
): Promise<void> => {
  try {
    await fetcher({
      apiPath: "/api/setting",
      method: "POST",
      body: { userId },
      token,
    });
  } catch (error) {
    console.error("ユーザー設定の作成に失敗しました", error);
    throw error;
  }
};

/**
 * 新規ユーザーを作成する関数
 * @param token アクセストークン
 * @returns 作成されたユーザーID
 */
export const createNewUser = async (token: string): Promise<string> => {
  // デフォルトのニックネームを設定
  const defaultNickname = `ユーザー${Math.floor(Math.random() * 10000)}`;

  // ユーザーを作成
  const userId = await createUser(defaultNickname, token);

  // ユーザー設定も作成
  await createUserSetting(userId, token);

  return userId;
};
