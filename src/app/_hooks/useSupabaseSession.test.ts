import { renderHook, act, waitFor } from "@testing-library/react";
import { useSupabaseSession } from "./useSupabaseSession";
import { supabase } from "@/app/_utils/supabase";
import { usePathname } from "next/navigation";

// Next.jsとSupabaseをモック化
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/app/_utils/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockSupabase = supabase as any;

describe("useSupabaseSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue("/test");
    // console.errorをモック化してテスト出力をクリーンに保つ
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("初期セッション取得", () => {
    it("セッションが存在する場合、正しく状態を設定する", async () => {
      // Arrange: モックセッションデータを準備
      const mockSession = {
        access_token: "test-token-123",
        user: { id: "user-123" },
      };

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act: フックを実行
      const { result } = renderHook(() => useSupabaseSession());

      // 初期状態の確認
      expect(result.current.isLoading).toBe(true);
      expect(result.current.session).toBe(undefined);
      expect(result.current.token).toBe(null);
      expect(result.current.error).toBe(null);

      // セッション取得完了まで待機
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert: 期待する結果と比較
      expect(result.current.isLoading).toBe(false);
      expect(result.current.session).toBe(mockSession);
      expect(result.current.token).toBe("test-token-123");
      expect(result.current.error).toBe(null);
    });

    it("セッションが存在しない場合、null状態を設定する", async () => {
      // Arrange
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act
      const { result } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert
      expect(result.current.isLoading).toBe(false);
      expect(result.current.session).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.error).toBe(null);
    });

    it("セッション取得時にSupabaseエラーが発生した場合、エラー状態を設定する", async () => {
      // Arrange
      const mockError = new Error("Supabase session error");
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: mockError,
      });

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act
      const { result } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert
      expect(result.current.isLoading).toBe(false);
      expect(result.current.session).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.error).toBe(mockError);
      expect(console.error).toHaveBeenCalledWith(
        "セッション取得エラー:",
        mockError
      );
    });

    it("予期しないエラーが発生した場合、エラー状態を設定する", async () => {
      // Arrange
      const mockError = new Error("Unexpected error");
      mockSupabase.auth.getSession.mockRejectedValue(mockError);

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act
      const { result } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert
      expect(result.current.isLoading).toBe(false);
      expect(result.current.session).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.error).toEqual(mockError);
      expect(console.error).toHaveBeenCalledWith(
        "予期しないセッション取得エラー:",
        mockError
      );
    });

    it("非Errorオブジェクトがthrowされた場合、適切にエラーハンドリングする", async () => {
      // Arrange
      const mockErrorString = "String error";
      mockSupabase.auth.getSession.mockRejectedValue(mockErrorString);

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act
      const { result } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Assert
      expect(result.current.isLoading).toBe(false);
      expect(result.current.session).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.error).toEqual(
        new Error("セッション取得に失敗しました")
      );
    });
  });

  describe("セッション自動更新", () => {
    it("認証状態変更時にセッションを更新し、エラーをクリアする", async () => {
      // Arrange
      const mockError = new Error("Initial error");
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: mockError,
      });

      let authStateCallback: (
        event: string,
        session: unknown
      ) => void = () => {};
      const mockUnsubscribe = jest.fn();

      mockSupabase.auth.onAuthStateChange.mockImplementation(
        (callback: (event: string, session: unknown) => void) => {
          authStateCallback = callback;
          return {
            data: { subscription: { unsubscribe: mockUnsubscribe } },
          };
        }
      );

      // Act
      const { result } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 初期エラー状態を確認
      expect(result.current.error).toBe(mockError);

      // 新しいセッションで認証状態変更をシミュレート
      const newSession = {
        access_token: "new-token-456",
        user: { id: "user-456" },
      };

      act(() => {
        authStateCallback("SIGNED_IN", newSession);
      });

      // Assert
      expect(result.current.session).toBe(newSession);
      expect(result.current.token).toBe("new-token-456");
      expect(result.current.error).toBe(null); // エラーがクリアされることを確認
    });

    it("ログアウト時にセッションをクリアし、エラーもクリアする", async () => {
      // Arrange
      const initialSession = {
        access_token: "initial-token",
        user: { id: "user-123" },
      };

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: initialSession },
        error: null,
      });

      let authStateCallback: (
        event: string,
        session: unknown
      ) => void = () => {};
      const mockUnsubscribe = jest.fn();

      mockSupabase.auth.onAuthStateChange.mockImplementation(
        (callback: (event: string, session: unknown) => void) => {
          authStateCallback = callback;
          return {
            data: { subscription: { unsubscribe: mockUnsubscribe } },
          };
        }
      );

      // Act
      const { result } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // ログアウトをシミュレート
      act(() => {
        authStateCallback("SIGNED_OUT", null);
      });

      // Assert
      expect(result.current.session).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.error).toBe(null);
    });
  });

  describe("ページ遷移時の動作", () => {
    it("パスが変更された場合にセッションを再取得し、エラーをリセットする", async () => {
      // Arrange
      const mockSession = {
        access_token: "test-token",
        user: { id: "user-123" },
      };

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act
      const { result, rerender } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // パスが変更された場合の動作をテスト
      mockUsePathname.mockReturnValue("/new-path");
      rerender();

      // Assert: getSessionが再度呼ばれることを確認
      expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(2);
    });
  });

  describe("クリーンアップ", () => {
    it("コンポーネントアンマウント時にサブスクリプションを解除する", async () => {
      // Arrange
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const mockUnsubscribe = jest.fn();
      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      });

      // Act
      const { unmount } = renderHook(() => useSupabaseSession());

      await waitFor(() => {
        expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled();
      });
      unmount();

      // Assert
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
