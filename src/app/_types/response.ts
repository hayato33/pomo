import { ZodIssue } from "zod-validation-error";

/** バリデーションエラーレスポンス型定義 */
export interface ValidationError {
  status: string;
  message: string;
  errors: ZodIssue[];
}
