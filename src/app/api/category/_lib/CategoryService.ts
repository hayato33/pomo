import { prisma } from "@/app/_lib/prisma";

/** カテゴリーサービスクラス */
export class CategoryService {
  /** カテゴリーを作成 */
  static async create({ name, userId }: { name: string; userId: string }) {
    return await prisma.category.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  /** カテゴリーを取得 */
  static async findByUserId(userId: string) {
    return await prisma.category.findMany({
      where: { userId },
    });
  }

  /** カテゴリーを更新 */
  static async update({
    id,
    name,
    userId,
  }: {
    id: string;
    name: string;
    userId: string;
  }) {
    return await prisma.category.update({
      where: {
        id,
        userId,
      },
      data: {
        name,
      },
    });
  }

  /** カテゴリーを削除 */
  static async delete(id: string, userId: string) {
    return await prisma.category.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
