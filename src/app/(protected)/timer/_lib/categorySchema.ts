import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "カテゴリー名を入力してください"),
});
