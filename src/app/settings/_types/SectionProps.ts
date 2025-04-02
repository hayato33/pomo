import { Control, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { UpdateData } from "./updateData";

export interface SectionProps {
  control: Control<UpdateData>;
  isSubmitting: boolean;
}

export interface ImageUploadSectionProps extends SectionProps {
  setValue: UseFormSetValue<UpdateData>;
  getValues: UseFormGetValues<UpdateData>;
}
