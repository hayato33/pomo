import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { Control } from "react-hook-form";
import { UpdateData } from "../_types/updateData";
import { Input } from "@/app/_components/elements/Input";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: keyof UpdateData;
  label: string;
}

export default function FormFieldInput({
  control,
  isSubmitting,
  name,
  label,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
            <FormLabel className="min-w-36 font-normal">{label}</FormLabel>
            <FormControl className="flex-1">
              <Input
                className="!mt-0"
                disabled={isSubmitting}
                value={field.value as string}
                onChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
