import { Category } from "@prisma/client";

export interface CategoryResponse {
  status: "success";
  message: string;
  data: Category;
}

export interface GetCategoriesResponse {
  status: "success";
  message: string;
  data: Category[];
}

/** カテゴリごとの統計データの型定義 */
export interface CategoryStats {
  categoryName: string;
  totalTime: number;
  percentage: number;
}
