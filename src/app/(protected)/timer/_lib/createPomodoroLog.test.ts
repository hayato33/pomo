import { createPomodoroLog } from "./createPomodoroLog";
import { fetcher } from "@/app/_utils/fetcher";
import { supabase } from "@/app/_utils/supabase";

// fetcherとsupabaseをモック化
jest.mock("@/app/_utils/fetcher");
jest.mock("@/app/_utils/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
    },
  },
}));

const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockSupabase = supabase as any;

describe("createPomodoroLog", () => {
  const mockParams = {
    completedCount: 4,
    completedTime: 25,
    displayInTimeline: true,
    categoryIds: ["category-1", "category-2"],
    token: "test-token-123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // console.errorとconsole.logをモック化してテスト出力をクリーンに保つ
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("正常系", () => {
    it("正常にポモドーロログを作成できる", async () => {
      // Arrange
      const mockResponse = {
        status: "success",
        message: "ポモドーロログを作成しました",
        data: { id: "log-123" },
      };

      mockFetcher.mockResolvedValue(mockResponse);

      // Act
      await createPomodoroLog(mockParams);

      // Assert: fetcherが正しいパラメータで呼ばれることを確認
      expect(mockFetcher).toHaveBeenCalledWith({
        apiPath: "/api/pomodoro",
        method: "POST",
        body: {
          completedCount: 4,
          completedTime: 25,
          displayInTimeline: true,
          categoryIds: ["category-1", "category-2"],
        },
        token: "test-token-123",
      });
      expect(mockFetcher).toHaveBeenCalledTimes(1);
    });
  });

  describe("異常系 - リトライなし", () => {
    it("ネットワークエラー時は即座に例外を投げる", async () => {
      // Arrange
      const networkError = new Error("Network error");
      mockFetcher.mockRejectedValue(networkError);

      // Act & Assert
      await expect(createPomodoroLog(mockParams)).rejects.toThrow(
        "Network error"
      );

      expect(mockFetcher).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "ポモドーロログの作成に失敗しました",
        networkError
      );
    });

    it("バリデーションエラー時は即座に例外を投げる", async () => {
      // Arrange
      const validationError = new Error("Validation failed");
      mockFetcher.mockRejectedValue(validationError);

      // Act & Assert
      await expect(createPomodoroLog(mockParams)).rejects.toThrow(
        "Validation failed"
      );

      expect(mockFetcher).toHaveBeenCalledTimes(1);
    });
  });

  describe("異常系 - 認証エラーリトライ", () => {
    it("認証エラー時にリトライして成功する", async () => {
      // Arrange
      const authError = new Error("認証に失敗しました");
      const mockNewSession = {
        access_token: "new-token-456",
        user: { id: "user-123" },
      };

      // 1回目は認証エラー、2回目は成功
      mockFetcher
        .mockRejectedValueOnce(authError)
        .mockResolvedValueOnce({ status: "success" });

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockNewSession },
        error: null,
      });

      // Act
      await createPomodoroLog(mockParams);

      // Assert: 2回fetcherが呼ばれることを確認
      expect(mockFetcher).toHaveBeenCalledTimes(2);

      // 1回目の呼び出し（失敗）
      expect(mockFetcher).toHaveBeenNthCalledWith(1, {
        apiPath: "/api/pomodoro",
        method: "POST",
        body: {
          completedCount: 4,
          completedTime: 25,
          displayInTimeline: true,
          categoryIds: ["category-1", "category-2"],
        },
        token: "test-token-123",
      });

      // 2回目の呼び出し（成功、新しいトークンを使用）
      expect(mockFetcher).toHaveBeenNthCalledWith(2, {
        apiPath: "/api/pomodoro",
        method: "POST",
        body: {
          completedCount: 4,
          completedTime: 25,
          displayInTimeline: true,
          categoryIds: ["category-1", "category-2"],
        },
        token: "new-token-456",
      });

      // 開発環境でのみconsole.logが実行されることを確認
      if (process.env.NODE_ENV === "development") {
        expect(console.log).toHaveBeenCalledWith(
          "認証エラーを検出。セッションを更新してリトライします..."
        );
        expect(console.log).toHaveBeenCalledWith(
          "リトライによりポモドーロログの作成に成功しました"
        );
      } else {
        expect(console.log).not.toHaveBeenCalled();
      }
    });

    it("unauthorizedエラー時にリトライして成功する", async () => {
      // Arrange
      const authError = new Error("unauthorized access");
      const mockNewSession = {
        access_token: "new-token-789",
        user: { id: "user-456" },
      };

      mockFetcher
        .mockRejectedValueOnce(authError)
        .mockResolvedValueOnce({ status: "success" });

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockNewSession },
        error: null,
      });

      // Act
      await createPomodoroLog(mockParams);

      // Assert
      expect(mockFetcher).toHaveBeenCalledTimes(2);
      expect(mockFetcher).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          token: "new-token-789",
        })
      );
    });

    it("401エラー時にリトライして成功する", async () => {
      // Arrange
      const authError = new Error("401 authentication failed");
      const mockNewSession = {
        access_token: "refreshed-token-abc",
        user: { id: "user-789" },
      };

      mockFetcher
        .mockRejectedValueOnce(authError)
        .mockResolvedValueOnce({ status: "success" });

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockNewSession },
        error: null,
      });

      // Act
      await createPomodoroLog(mockParams);

      // Assert
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });
  });

  describe("異常系 - リトライも失敗", () => {
    it("セッション更新に失敗した場合", async () => {
      // Arrange
      const authError = new Error("認証に失敗しました");
      mockFetcher.mockRejectedValue(authError);

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      // Act & Assert
      await expect(createPomodoroLog(mockParams)).rejects.toThrow(
        "認証エラー: ログインし直してください"
      );

      expect(mockFetcher).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "リトライも失敗しました",
        expect.any(Error)
      );
    });

    it("セッション取得時にエラーが発生した場合", async () => {
      // Arrange
      const authError = new Error("unauthorized");
      mockFetcher.mockRejectedValue(authError);

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: new Error("Session fetch failed"),
      });

      // Act & Assert
      await expect(createPomodoroLog(mockParams)).rejects.toThrow(
        "認証エラー: ログインし直してください"
      );
    });

    it("リトライ後も認証エラーが続く場合", async () => {
      // Arrange
      const authError = new Error("認証失敗");
      const retryError = new Error("リトライでも認証失敗");

      mockFetcher
        .mockRejectedValueOnce(authError)
        .mockRejectedValueOnce(retryError);

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: { access_token: "valid-token" } },
        error: null,
      });

      // Act & Assert
      await expect(createPomodoroLog(mockParams)).rejects.toThrow(
        "認証エラー: ログインし直してください"
      );

      expect(mockFetcher).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenCalledWith(
        "リトライも失敗しました",
        retryError
      );
    });
  });

  describe("境界値テスト", () => {
    it("空のカテゴリIDでも正常に動作する", async () => {
      // Arrange
      const paramsWithEmptyCategories = {
        ...mockParams,
        categoryIds: [],
      };

      mockFetcher.mockResolvedValue({ status: "success" });

      // Act
      await createPomodoroLog(paramsWithEmptyCategories);

      // Assert
      expect(mockFetcher).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            categoryIds: [],
          }),
        })
      );
    });

    it("空のトークンでも正常にエラーハンドリングが動作する", async () => {
      // Arrange
      const paramsWithEmptyToken = {
        ...mockParams,
        token: "",
      };

      const authError = new Error("認証が必要です");
      mockFetcher.mockRejectedValue(authError);

      // Act & Assert
      await expect(createPomodoroLog(paramsWithEmptyToken)).rejects.toThrow();
    });
  });
});
