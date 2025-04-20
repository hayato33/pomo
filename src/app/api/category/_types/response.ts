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
