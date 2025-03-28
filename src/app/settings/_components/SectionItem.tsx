import { Label } from "@/app/_components/elements/Label";
import { FieldErrors } from "react-hook-form";
import { UpdateData } from "../_types/updateData";
import { ErrorMessage } from "@/app/_components/elements/ErrorMessage";

interface Props {
  labelText: string;
  id: keyof UpdateData;
  children: React.ReactNode;
  errors: FieldErrors<UpdateData>;
}

export default function SectionItem({
  labelText,
  id,
  children,
  errors,
}: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
        <Label htmlFor={id} className="min-w-36 font-normal">
          {labelText}
        </Label>
        {children}
      </div>
      <ErrorMessage message={errors[id]?.message} />
    </div>
  );
}
