import { Switch } from "@/app/_components/elements/Switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { Control } from "react-hook-form";
import { UpdateData } from "../_types/updateData";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: keyof UpdateData;
  label: string;
}

export default function FormFieldSwitch({
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
            <FormControl>
              <Switch
                className="!mt-0"
                disabled={isSubmitting}
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
