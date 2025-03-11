import { fetcher } from "@/app/_utils/fetcher";

/**
 * ユーザーの存在確認と必要に応じて作成を行う関数
 * @param token アクセストークン
 */
export const ensureUserExists = async (token: string): Promise<void> => {
  try {
    // GETリクエストでユーザーの存在確認
    const userResponse = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: token ?? "",
      },
    });

    // ユーザーが既に存在する場合は何もしない
    if (userResponse.ok) return;

    // ユーザーが存在しない場合は新規作成
    await createNewUser(token);
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
 * @param token アクセストークン
 */
export const createUserSetting = async (token: string): Promise<void> => {
  try {
    await fetcher({
      apiPath: "/api/setting",
      method: "POST",
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
 */
export const createNewUser = async (token: string): Promise<void> => {
  try {
    // ユーザーを作成
    const defaultNickname = `ユーザー${Math.floor(Math.random() * 10000)}`;
    await createUser(defaultNickname, token);

    // ユーザー設定も作成
    await createUserSetting(token);
  } catch (error) {
    console.error("ユーザー＆ユーザー設定の作成に失敗しました", error);
    throw error;
  }
};
