import { prisma } from "@/app/_lib/prisma";
import { CategoryService } from "./CategoryService";

// prismaのモック
jest.mock("@/app/_lib/prisma", () => ({
  prisma: {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("CategoryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("create: カテゴリを正常に作成できる", async () => {
    // モックの設定
    const mockCategory = {
      id: "category-id",
      name: "テストカテゴリ",
      userId: "user-id",
    };
    // @ts-expect-error - テストコードのためTypeScriptの型チェックを無視
    prisma.category.create.mockResolvedValue(mockCategory);

    // 実行
    const result = await CategoryService.create({
      name: "テストカテゴリ",
      userId: "user-id",
    });

    // 検証
    expect(result).toEqual(mockCategory);
    expect(prisma.category.create).toHaveBeenCalledWith({
      data: {
        name: "テストカテゴリ",
        user: {
          connect: {
            id: "user-id",
          },
        },
      },
    });
  });

  test("findByUserId: ユーザーIDに基づいてカテゴリ一覧を取得できる", async () => {
    // モックの設定
    const mockCategories = [
      { id: "category-1", name: "カテゴリ1", userId: "user-id" },
      { id: "category-2", name: "カテゴリ2", userId: "user-id" },
    ];
    // @ts-expect-error - テストコードのためTypeScriptの型チェックを無視
    prisma.category.findMany.mockResolvedValue(mockCategories);

    // 実行
    const result = await CategoryService.findByUserId("user-id");

    // 検証
    expect(result).toEqual(mockCategories);
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      where: { userId: "user-id" },
    });
  });

  test("update: カテゴリを正常に更新できる", async () => {
    // モックの設定
    const mockCategory = {
      id: "category-id",
      name: "更新後カテゴリ",
      userId: "user-id",
    };
    // @ts-expect-error - テストコードのためTypeScriptの型チェックを無視
    prisma.category.update.mockResolvedValue(mockCategory);

    // 実行
    const result = await CategoryService.update({
      id: "category-id",
      name: "更新後カテゴリ",
      userId: "user-id",
    });

    // 検証
    expect(result).toEqual(mockCategory);
    expect(prisma.category.update).toHaveBeenCalledWith({
      where: {
        id: "category-id",
        userId: "user-id",
      },
      data: {
        name: "更新後カテゴリ",
      },
    });
  });

  test("delete: カテゴリを正常に削除できる", async () => {
    // モックの設定
    const mockCategory = {
      id: "category-id",
      name: "削除カテゴリ",
      userId: "user-id",
    };
    // @ts-expect-error - テストコードのためTypeScriptの型チェックを無視
    prisma.category.delete.mockResolvedValue(mockCategory);

    // 実行
    const result = await CategoryService.delete("category-id", "user-id");

    // 検証
    expect(result).toEqual(mockCategory);
    expect(prisma.category.delete).toHaveBeenCalledWith({
      where: {
        id: "category-id",
        userId: "user-id",
      },
    });
  });
});
