import { Control } from "react-hook-form";
import { UpdateData } from "./updateData";

export interface SectionProps {
  control: Control<UpdateData>;
  isSubmitting: boolean;
}
