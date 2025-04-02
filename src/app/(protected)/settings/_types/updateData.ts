import { z } from "zod";
import { settingFormSchema } from "../_lib/settingFormSchema";

export type UpdateData = z.infer<typeof settingFormSchema>;
